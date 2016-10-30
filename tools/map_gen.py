import numpy
from PIL import Image
from PIL import ImageFilter
from PIL import ImageDraw

#Globals
MAP_H = 533
MAP_W = MAP_H
YEAR_RES = 100
BLUR_SIZE = MAP_H / 20
EXT_MARGIN = numpy.pi/64
CITY_COLOR = 'rgb(255, 0, 0)'
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
    # (23.5degrees and summer solstice on the 172nd day)
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
    shadow = numpy.zeros((MAP_H, MAP_W, 4), dtype=numpy.uint8)
    
    for xa in range(MAP_W):
        for ya in range(MAP_H):
            sx, sy = azi_to_spher(xa, ya)
            cart = get_cart(sx, sy)
            p = numpy.array([cart[0], cart[1], cart[2]])
            illu = sd.dot(p)
            
            # remain on projection circle
            if coo[0] < numpy.pi + EXT_MARGIN:
                # draw shadow
                if illu < 0 :
                    shadow[xa,ya,3] = 255

    return shadow


def generate_shadows(res):
    for i, x in enumerate(numpy.linspace(0, 2*numpy.pi, res)):
        array = draw_shadow(x)
        # image in Grayscale, one 8-bit byte per pixel
        im = Image.fromarray(array, mode='RGBA')
        im = im.filter(ImageFilter.GaussianBlur(BLUR_SIZE))
        im.save('../static/img/shadows/' + str(i) + '.png')
        print('Drawing shadow', i+1, '/', YEAR_RES)

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
        # drawing condition
        if ((c["capital"] == True and c["population"] > 1000000)
        or c["population"] > 10000000):
            x, y = get_azi(c["latitude"], c["longitude"])
            draw.ellipse((x-CITY_W, y-CITY_W, x+CITY_W, y+CITY_W), fill=CITY_COLOR)
            print('Drawing city', c["name"])
    image.save('../static/img/cities.png')


#~ generate_shadows(YEAR_RES)

draw_cities(load_cities('cities15000.txt'))
