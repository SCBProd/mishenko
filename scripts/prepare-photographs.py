from pathlib import Path
from PIL import Image, ImageOps
import json
root=Path('dist/assets/photography'); root.mkdir(parents=True,exist_ok=True)
sources=[
('stone','landscape','E:/FOTOS/Basteiweg, 01824 Lohmen/38.jpg'),
('river','landscape','E:/FOTOS/Basteiweg, 01824 Lohmen/55.jpg'),
('ferns','landscape','E:/FOTOS/Basteiweg, 01824 Lohmen/7.jpg'),
('yellow','botanical','E:/FOTOS/Flowers/Golden Glow Spring Yellow Palette/Bright yellow spring flowers on a branch under warm natural light.jpg'),
('sakura','botanical','E:/FOTOS/Flowers/Japanese Cherry Blossom Collection/Branches of pink sakura cherry blossoms in full bloom against a bright sky.jpg'),
('evening','botanical','E:/FOTOS/Flowers/Mixed white flowers and pink buds (03.04.26)/Spring blossom branch in warm evening sunlight.jpg'),
('petals','botanical','E:/FOTOS/Flowers/Pure Bloom Minimalist White Petals/Spring blossom Delicate white flowers on a branch with soft bokeh background.jpg'),
('rosehips','botanical','E:/FOTOS/Flowers/Rosehips/Seasons overlap dried red rose hips on a branch with fresh green spring leaves.jpg'),
('pink','botanical','E:/FOTOS/Flowers/Shutterstock 2025/Delicate pink cherry blossom branch against a bright blue sky. Minimalist copy space.jpg'),
('leaves','botanical','E:/FOTOS/Flowers/Young green leaves/Fresh green leaves on branches in spring garden.jpg'),
('rain','texture','E:/FOTOS/Raindrops texture/Raindrops on window glass with colorful city lights bokeh.jpg'),
('reflection','city','E:/FOTOS/Reflection - light/Modern cafe storefront with green plants and decorative lamps reflected in clean glass.jpg'),
('water','texture','E:/FOTOS/Texture/Water ripples and drops on a wet, dark wooden deck texture.jpg'),
('traffic','city','E:/FOTOS/Urban/Night city/11.jpg'),
('platform','city','E:/FOTOS/Urban/Night city/3 — копия (2).jpg'),
('motion','city','E:/FOTOS/Urban/Urban Noir Cinematic City Reflections & Motion Blur/Golden hour rush Blurred silhouettes and city lights background.jpg'),
('windows','city','E:/FOTOS/Urban/Urban Noir Cinematic City Reflections & Motion Blur/City Windows Abstract architectural reflection with a passing silhouette.jpg'),
('architecture','city','E:/FOTOS/Urban/Stone Echoes Gothic Heritage & Medieval Streets/Minimalist architectural background of a historic city building.jpg'),
('sky','landscape','E:/FOTOS/Небо/Unbenannter Export/2.jpg'),
('street','city','E:/FOTOS/Random shots  Случайные кадры/02.jpg'),
('play','people','E:/FOTOS/PEOPLE/10.05.26/41.jpg'),
('smile','people','E:/FOTOS/PEOPLE/24.04/05.jpg'),
('duck','landscape','E:/FOTOS/PEOPLE/24.04/01.jpg'),
('thought','people','E:/FOTOS/PEOPLE/25.04.26/06.jpg'),
('family','people','E:/FOTOS/PEOPLE/26.04.26/63.jpg'),
('anastasia','people','E:/FOTOS/PEOPLE/ANASTASIA 27.03.2026/_DSC3216.JPG'),
('blue-hour','city','E:/FOTOS/Reflection - light/Close-up of decorative glowing light bulb hanging in front of a blue hour city street reflection 1.jpg')]
items=[]
for name,group,src in sources:
    with Image.open(src) as source:
        im=ImageOps.exif_transpose(source).convert('RGB'); w,h=im.size
        icc=source.info.get('icc_profile')
        for size in (720,1440,2400):
            copy=im.copy(); copy.thumbnail((size,size)); copy.save(root/f'{name}-{size}.webp','WEBP',quality=87 if size==2400 else 82,icc_profile=icc)
        items.append(dict(id=name,group=group,width=w,height=h))
Path('dist/photography-data.js').write_text('window.PHOTOS = '+json.dumps(items)+';\n',encoding='utf-8')
print('Prepared',len(items),'photographs;',round(sum(p.stat().st_size for p in root.glob('*.webp'))/1024/1024,2),'MB')
