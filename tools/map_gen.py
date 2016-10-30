import numpy
from PIL import Image
from PIL import ImageFilter
from PIL import ImageDraw

#Globals
MAP_H = 533
MAP_W = MAP_H
MARGIN = MAP_H // 10
YEAR_RES = 101  #should be an even number
BLUR_SIZE = MAP_H // 50
CITY_COLOR = '#DA6C5F'
CITY_OUTLINE = 'white'
CITY_W = 3

# convert 2D azimutal map coord to spherical
def azi_to_spher(x, y):
    x = x - MAP_W/2
    y = y - MAP_W/2
    r = numpy.sqrt(x**2 + y**2)
    if r > 0:
        lon = numpy.arccos(y / r)
    else:
        lon = 0
    lat = r/(MAP_W/2) * numpy.pi
    return [lat, lon]

# get cartesian coordinates from spherical coordinates
def get_cart(lat, lon): 
    x = numpy.sin(lat) * numpy.cos(lon)
    y = numpy.sin(lat) * numpy.sin(lon)
    z = numpy.cos(lat)
    return [x, y, z]
    
# return coords on 2D map from lat lon in degrees
def get_azi(lat, lon):
    lon = lon * numpy.pi/180
    r = (MAP_W/4)/90 * lat + MAP_W/4
    x = r * numpy.cos(lon - numpy.pi/2) + MAP_W/2
    y = r * numpy.sin(lon - numpy.pi/2) + MAP_W/2
    return [x, y]

#
## Shadows generation
#

# give the sun angle with earth equatorial plane
def get_sun_tilt(x) :
    # the tilt between earth and sun
    # 23.5degrees 
    observable_tilt = 23.5*numpy.cos(x)
    # in radians
    observable_tilt = 2*numpy.pi*(observable_tilt/360.)
    return observable_tilt

#~ draw the zone of earth self-shadowing
def draw_shadow(x) :
    # sun tilt according to season
    tilt = get_sun_tilt(x)
    # sun direction vector
    sd = numpy.array([numpy.cos(tilt),0 , -numpy.sin(tilt)])
    # shadow pixels array
    shadow = numpy.zeros((MAP_H + MARGIN, MAP_W + MARGIN, 4), dtype=numpy.uint8)
    
    for xa in range(MAP_W + MARGIN):
        for ya in range(MAP_H + MARGIN):
            sx, sy = azi_to_spher(xa, ya)
            cart = get_cart(sx, sy)
            p = numpy.array([cart[0], cart[1], cart[2]])
            illu = sd.dot(p)
            
            # remain on earth
            if sx < numpy.pi:
                # draw shadow
                if illu < 0 :
                    shadow[xa + MARGIN/2, ya + MARGIN/2, 3] = 255

    return shadow


def generate_shadows(res):
    lspace = numpy.linspace(0, numpy.pi, res)
    for i, x in enumerate(lspace):
        print('Drawing shadow', i, '.png /', YEAR_RES - 1, 'at angle :', x)
        # generate shadow array
        array = draw_shadow(x)
        # convert to RGBA image
        img = Image.fromarray(array, mode='RGBA')
        # rotate
        img = img.rotate(-90)
        # add margin before blurring
        #~ img_w, img_h = img.size
        #~ back = Image.new('RGBA', (MAP_W + MARGIN, MAP_H + MARGIN), (0, 0, 0, 0))
        #~ bg_w, bg_h = back.size
        #~ offset = (int((bg_w - img_w) / 2), int((bg_h - img_h) / 2))
        #~ back.paste(img, offset)
        #~ img = back
        # blur
        img = img.filter(ImageFilter.GaussianBlur(BLUR_SIZE))
        
        img.save('../static/img/shadows/' + str(i) + '.png')

#~ img = Image.open("oo.png")
#~ print img
#~ arr = numpy.array(img)
#~ print arr.dtype
#~ print arr
#~ img = Image.fromarray(arr)
#~ img.save("ii.png")
#~ 

#
## City layer generation
#
import csv

EXCEPTIONS = [
['Canberra', -35.28346, 149.12807],
['Ottawa', 45.41117, -75.69812],
['Reykjavík', 64.13548, -21.89541],
['Papeete', -17.53733, -149.5665],
['Miami', 25.77427, -80.19366],
['Dallas', 32.78306, -96.80667],
['Chicago', 41.85003, -87.65005],
['Detroit', 42.33143, -83.04575],
['San Francisco', 37.77493, -122.41942],
['Denver', 39.73915, -104.9847],
['Honolulu', 21.30694, -157.85833],
['Anchorage', 61.21806, -149.90028],
['New Orleans', 29.95465, -90.07507],
['Seattle', 47.60621, -122.33207]
]


def load_cities(fname):
    cities = []
    with open(fname, newline='', encoding='utf-8') as f:
        reader = csv.reader(f, delimiter='\t', quotechar='"')
        for row in reader:
            city = {"name":row[1],
                "latitude":float(row[4]),
                "longitude":float(row[5]),
                "population":float(row[14]),
                "capital":row[7] == "PPLC"}
            cities.append(city)
    return cities

def draw_cities(cities) :
    image = Image.new('RGBA', (MAP_W, MAP_H))
    draw = ImageDraw.Draw(image)
    
    for c in cities:
        x, y = get_azi(c["latitude"], c["longitude"])
        # drawing condition
        if ((c["capital"] == True and c["population"] > 1000000)
        or c["population"] > 10000000
        or [c["name"], c["latitude"], c["longitude"]] in EXCEPTIONS):
            draw.ellipse((x-CITY_W, y-CITY_W, x+CITY_W, y+CITY_W),
                fill=CITY_COLOR,
                outline=CITY_OUTLINE)
            print(c["name"])

    image.save('../static/img/cities.png')


generate_shadows(YEAR_RES)
#~ 
#~ draw_cities(load_cities('cities15000.txt'))
