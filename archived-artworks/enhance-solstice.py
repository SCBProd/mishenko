from pathlib import Path
from PIL import Image, ImageFilter, ImageOps, ImageDraw
import numpy as np
import json

root=Path(__file__).parent
folder=root/'dist/assets/solstice'
report=[]
comparisons=[]
for i in range(7):
    original=Image.open(folder/f'art-{i}.jpg')
    image=ImageOps.exif_transpose(original).convert('RGB')
    rgb=np.asarray(image,dtype=np.float32)
    luminance=rgb@np.array([.2126,.7152,.0722],dtype=np.float32)
    gray=Image.fromarray(np.clip(np.rint(luminance),0,255).astype('uint8'))
    median=np.asarray(gray.filter(ImageFilter.MedianFilter(3)),dtype=np.float32)
    local_max=np.asarray(gray.filter(ImageFilter.MaxFilter(3)),dtype=np.float32)
    local_min=np.asarray(gray.filter(ImageFilter.MinFilter(3)),dtype=np.float32)
    # Only reduce weak noise in smooth regions; retain ceramic grain and glass edges.
    smooth=(local_max-local_min)<10
    noise_delta=np.where(smooth,.22*np.clip(median-luminance,-3,3),0)
    base=luminance+noise_delta
    blurred=np.asarray(gray.filter(ImageFilter.GaussianBlur(.7)),dtype=np.float32)
    detail=base-blurred
    sharpen=np.where(np.abs(detail)>1.2,np.clip(.38*detail,-4,4),0)
    delta=noise_delta+sharpen
    # Equal offsets to RGB preserve channel differences; bound to avoid clipping.
    delta=np.clip(np.rint(delta),-rgb.min(axis=2),255-rgb.max(axis=2))
    result=(rgb+delta[:,:,None]).astype('uint8')
    assert np.array_equal(result[:,:,0].astype(int)-result[:,:,1],rgb[:,:,0].astype(int)-rgb[:,:,1])
    assert np.array_equal(result[:,:,1].astype(int)-result[:,:,2],rgb[:,:,1].astype(int)-rgb[:,:,2])
    enhanced=Image.fromarray(result)
    options={'lossless':True,'method':6,'exact':True}
    if original.info.get('icc_profile'):options['icc_profile']=original.info['icc_profile']
    enhanced.save(folder/f'art-{i}-refined.webp',**options)
    report.append({'file':i,'size':image.size,'mean_luminance_change':float(delta.mean()),'max_change':float(np.abs(delta).max()),'colour_channel_differences_preserved':True})
    if i in [3,6]:
        w,h=image.size
        box=(int(w*.35),int(h*.25),int(w*.7),int(h*.75))
        pair=Image.new('RGB',(800,420),'#eeeeee')
        for n,im in enumerate([image,enhanced]):
            crop=im.crop(box);crop.thumbnail((390,380));pair.paste(crop,(n*400,30))
        d=ImageDraw.Draw(pair);d.text((10,8),f'{i}: Original',fill='black');d.text((410,8),'Refined',fill='black')
        comparisons.append(pair)
qa=root.parent/'solstice-quality-review.jpg'
board=Image.new('RGB',(800,420*len(comparisons)),'white')
for n,im in enumerate(comparisons):board.paste(im,(0,n*420))
board.save(qa,quality=95)
print(json.dumps(report,indent=2))
