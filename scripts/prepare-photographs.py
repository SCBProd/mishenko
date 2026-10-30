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
('blue-hour','city','E:/FOTOS/Reflection - light/Close-up of decorative glowing light bulb hanging in front of a blue hour city street reflection 1.jpg'),
('forsythia-branch', 'botanical', 'E:/FOTOS/Flowers/Golden Glow Spring Yellow Palette/Spring blossoms on a brown wooden branch with soft outdoor background.jpg'),
('forsythia-fence', 'botanical', 'E:/FOTOS/Flowers/Golden Glow Spring Yellow Palette/Vibrant yellow forsythia blooms against a soft urban fence background.jpg'),
('forsythia-garden', 'botanical', 'E:/FOTOS/Flowers/Golden Glow Spring Yellow Palette/Bright yellow forsythia flowers on a branch in early spring garden.jpg'),
('forsythia-bud', 'botanical', 'E:/FOTOS/Flowers/Golden Glow Spring Yellow Palette/Minimalist spring branch of yellow forsythia with a green bud.jpg'),
('forsythia-detail', 'botanical', 'E:/FOTOS/Flowers/Golden Glow Spring Yellow Palette/Detailed macro shot of yellow forsythia blossom on a twig.jpg'),
('forsythia-glow', 'botanical', 'E:/FOTOS/Flowers/Golden Glow Spring Yellow Palette/Glowing yellow forsythia blossoms with soft bokeh and morning sunlight.jpg'),
('sakura-soft', 'botanical', 'E:\\FOTOS\\Flowers\\Japanese Cherry Blossom Collection\\Beautiful pink sakura cherry blossom branches with soft focus background.jpg'),
('sakura-buds', 'botanical', 'E:\\FOTOS\\Flowers\\Japanese Cherry Blossom Collection\\Close-up of pink sakura flower buds on a branch before blooming.jpg'),
('sakura-first', 'botanical', 'E:\\FOTOS\\Flowers\\Japanese Cherry Blossom Collection\\First breath of spring delicate pink sakura blossoms on a slender twig.jpg'),
('sakura-dark', 'botanical', 'E:\\FOTOS\\Flowers\\Japanese Cherry Blossom Collection\\Minimalist pink sakura branch with early blossoms and buds on a dark background.jpg'),
('sakura-sky', 'botanical', 'E:\\FOTOS\\Flowers\\Japanese Cherry Blossom Collection\\pink sakura cherry blossom branches against a bright white sky.jpg'),
('evening-silhouette', 'botanical', 'E:\\FOTOS\\Flowers\\Mixed white flowers and pink buds (03.04.26)\\Silhouette of blooming tree branch against golden sunset sun.jpg'),
('evening-branches', 'botanical', 'E:\\FOTOS\\Flowers\\Mixed white flowers and pink buds (03.04.26)\\Branches of white blooming flowers in bright sunset sunlight.jpg'),
('evening-twilight', 'botanical', 'E:\\FOTOS\\Flowers\\Mixed white flowers and pink buds (03.04.26)\\Delicate white blossoms in soft evening light at twilight.jpg'),
('evening-buds', 'botanical', 'E:\\FOTOS\\Flowers\\Mixed white flowers and pink buds (03.04.26)\\Flowering fruit tree branch with buds against twilight sky.jpg'),
('evening-flare-2', 'botanical', 'E:\\FOTOS\\Flowers\\Mixed white flowers and pink buds (03.04.26)\\Flowering tree branch in soft twilight light with sun flare 2.jpg'),
('evening-flare', 'botanical', 'E:\\FOTOS\\Flowers\\Mixed white flowers and pink buds (03.04.26)\\Flowering tree branch in soft twilight light with sun flare.jpg'),
('evening-stamens', 'botanical', 'E:\\FOTOS\\Flowers\\Mixed white flowers and pink buds (03.04.26)\\Macro of white tree blossoms with yellow stamens in spring.jpg'),
('evening-sun', 'botanical', 'E:\\FOTOS\\Flowers\\Mixed white flowers and pink buds (03.04.26)\\Spring tree branch with white flowers against glowing sun background.jpg'),
('evening-dusk', 'botanical', 'E:\\FOTOS\\Flowers\\Mixed white flowers and pink buds (03.04.26)\\Spring tree branch with white flowers and buds at dusk.jpg'),
('evening-close', 'botanical', 'E:\\FOTOS\\Flowers\\Mixed white flowers and pink buds (03.04.26)\\White spring blossoms on a tree branch close-up.jpg'),
('evening-blue', 'botanical', 'E:\\FOTOS\\Flowers\\Mixed white flowers and pink buds (03.04.26)\\White spring blossoms on branch against blue evening sky.jpg'),
('evening-bokeh', 'botanical', 'E:\\FOTOS\\Flowers\\Mixed white flowers and pink buds (03.04.26)\\White spring tree blossoms on branches with soft bokeh background.jpg'),
('spring-floral', 'botanical', 'E:\\FOTOS\\Flowers\\Mixed white flowers and pink buds (03.04.26)\\Delicate white floral background for spring.jpg'),
('spring-bee', 'botanical', 'E:\\FOTOS\\Flowers\\Mixed white flowers and pink buds (03.04.26)\\Honey bee collecting pollen on white cherry blossom.jpg'),
('spring-center', 'botanical', 'E:\\FOTOS\\Flowers\\Mixed white flowers and pink buds (03.04.26)\\Macro of White Spring Flower with Yellow Center.jpg'),
('spring-bee-sky', 'botanical', 'E:\\FOTOS\\Flowers\\Mixed white flowers and pink buds (03.04.26)\\Macro shot of bee on flower with blue sky background.jpg'),
('spring-white', 'botanical', 'E:\\FOTOS\\Flowers\\Mixed white flowers and pink buds (03.04.26)\\White spring blossom flowers on a tree branch.jpg'),
('spring-golden', 'botanical', 'E:\\FOTOS\\Flowers\\Mixed white flowers and pink buds (03.04.26)\\White spring blossoms on branch in golden hour light.jpg'),
('spring-mixed', 'botanical', 'E:\\FOTOS\\Flowers\\Mixed white flowers and pink buds (03.04.26)\\Beautiful spring branches with pink and white blossoms against blue sky.jpg'),
('spring-sunset', 'botanical', 'E:\\FOTOS\\Flowers\\Mixed white flowers and pink buds (03.04.26)\\Beautiful spring flowering branch in golden sunset light.jpg'),
('spring-pink-buds', 'botanical', 'E:\\FOTOS\\Flowers\\Mixed white flowers and pink buds (03.04.26)\\Close-up of pink flower buds on branch in early spring.jpg'),
('spring-bud-bokeh', 'botanical', 'E:\\FOTOS\\Flowers\\Mixed white flowers and pink buds (03.04.26)\\Delicate pink buds on a tree branch with soft golden bokeh.jpg'),
('forsythia-sun', 'botanical', 'E:\\FOTOS\\Flowers\\Shutterstock 2025\\Vivid yellow Forsythia flowers on a dark, sunny spring day.jpg'),
('forsythia-early', 'botanical', 'E:\\FOTOS\\Flowers\\Shutterstock 2025\\Bright yellow Forsythia flowers in early spring. Nature background.jpg'),
('forsythia-panorama', 'botanical', 'E:\\FOTOS\\Flowers\\Shutterstock 2025\\Panoramic view of bright yellow Forsythia with green leaves in sunlight.jpg'),
('glass-edison-1', 'city', 'E:\\FOTOS\\Reflection - light\\Elegant Edison style light bulbs hanging inside a coffee shop view through glass 1.jpg'),
('glass-edison', 'city', 'E:\\FOTOS\\Reflection - light\\Elegant Edison style light bulbs hanging inside a coffee shop view through glass.jpg'),
('glass-trees', 'city', 'E:\\FOTOS\\Reflection - light\\Moody city view with bare trees and old buildings reflected in a window with cozy hanging lamps.jpg'),
('glass-self', 'city', 'E:\\FOTOS\\Reflection - light\\Silhouette of a person taking a photo reflected in a cafe window with glowing vintage lamps.jpg'),
('glass-arcade', 'city', 'E:\\FOTOS\\Reflection - light\\Abstract reflection of a street arcade with people walking seen through a glass window with warm lights.jpg'),
('glass-architecture', 'city', 'E:\\FOTOS\\Reflection - light\\Artistic reflection of old european architecture mixed with warm interior lighting and wooden decor.jpg'),
('glass-blue', 'city', 'E:\\FOTOS\\Reflection - light\\Close-up of decorative glowing light bulb hanging in front of a blue hour city street reflection.jpg'),
('glass-cozy', 'city', 'E:\\FOTOS\\Reflection - light\\Cozy cafe window reflection with warm decorative light bulbs and street silhouette.jpg')]
sources += [('night-13', 'city', 'E:/FOTOS/Urban/Night city/13.jpg'), ('night-14', 'city', 'E:/FOTOS/Urban/Night city/14.jpg'), ('night-15', 'city', 'E:/FOTOS/Urban/Night city/15.jpg'), ('night-17', 'city', 'E:/FOTOS/Urban/Night city/17.jpg'), ('night-21', 'city', 'E:/FOTOS/Urban/Night city/21.jpg'), ('night-5', 'city', 'E:/FOTOS/Urban/Night city/5.jpg'), ('night-9', 'city', 'E:/FOTOS/Urban/Night city/9.jpg'), ('night-10', 'city', 'E:/FOTOS/Urban/Night city/10.jpg')]
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
