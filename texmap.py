#!/usr/bin/env python3

from PIL import Image, ImageDraw, ImageFont, ImageColor
import math
import random

COLORS = {'A': 'red',
          'T': '#FAA619', #'yellow',
          'G': '#94BA33', #'green',
          'C': '#01BADE', #'blue',
          '0': 'black',
          '1': 'gray'
          }

def main():
    width, height = 1024, 1024
    dx, dy = 64, 64
    maxx, maxy = math.floor(width/dx), math.floor(height/dy)
    fontname = "SourceSansPro-Regular.otf"
    fontsize = 62
    font = ImageFont.truetype(fontname, fontsize)
    img = Image.new('RGBA', (width, height))
    d = ImageDraw.Draw(img)
    
    char_set = 'ATGC10'

    for j in range(0, maxy):
        y = j * dy
        for i in range(0, maxx):
            x = i * dx
            char = random.choice(char_set)
            color = COLORS[char]
            w,h = font.getsize(char)
            xoffset = (dx-w)/2
            d.text((x+xoffset, y), char, fill=color, font=font)
    img.save("texture.png")


if __name__ == '__main__':
    main()

    
