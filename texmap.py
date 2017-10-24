#!/usr/bin/env python3

from PIL import Image, ImageDraw, ImageFont
import random

COLORS = {'A': 'red',
          'T': 'yellow',
          'G': 'green',
          'C': 'blue',
          '0': 'black',
          '1': 'gray'
          }

def main():
    width, height = 1024, 1024
    fontname = "SourceSansPro-Regular.otf"
    fontsize = 48
    font = ImageFont.truetype(fontname, fontsize)
    img = Image.new('RGBA', (width, height))
    d = ImageDraw.Draw(img)
    
    char_set = 'ATGC10'

    for j in range(0,25):
        y = j * 50
        for i in range(0, 25):
            x = i * 50
            char = random.choice(char_set)
            color = COLORS[char]
            d.text((x, y), char, fill=color, font=font)
    img.save("texture.png")


if __name__ == '__main__':
    main()

    
