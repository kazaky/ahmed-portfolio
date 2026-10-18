"""Render silent product promos from original portfolio assets. Requires Pillow and ffmpeg.
Uses the installed Sharp package to rasterize the original brand logos.
"""
from PIL import Image, ImageDraw, ImageFont, ImageOps
from pathlib import Path
import math, subprocess, textwrap, tempfile, json
ROOT=Path(__file__).resolve().parents[1]
W,H,FPS,DURATION=960,600,24,9
sans='/System/Library/Fonts/Supplemental/Arial.ttf'
bold='/System/Library/Fonts/Supplemental/Arial Bold.ttf'
serif='/System/Library/Fonts/Supplemental/Georgia Italic.ttf'
font=lambda size,kind=sans: ImageFont.truetype(kind,size)
configs=[
 ('misho','Misho','Your day, anchored in prayer.','#f1e6d6','#b54c1c','#302519',['Prayer-based planning','Tasks between salah','Space for someday'],'misho.day'),
 ('tawazun','Tawazun','Read for a more balanced life.','#161b20','#cfb981','#f4f0e6',['Thoughtful essays','Curated collections','Reading guides'],'tawazun.space'),
 ('iqrar-dayn','IqrarDayn','Clear terms. Shared understanding.','#edf1ff','#3659e8','#24305a',['Record loan terms','Gather signatures','Keep a shared record'],'iqrardayn.com'),
 ('loqmaan','Loqmaan','A world of Arabic wisdom.','#25213e','#c9b5fb','#f5efff',['Discover authors','Explore topics','Browse by mood'],'loqmaan.com'),
]
def ease(v):
 v=max(0,min(1,v));return 1-(1-v)**3

def text(draw,xy,value,fill,size,kind=sans):draw.text(xy,value,font=font(size,kind),fill=fill)

def centered(draw,y,value,fill,size,kind=sans):
 f=font(size,kind); box=draw.textbbox((0,0),value,font=f);draw.text(((W-(box[2]-box[0]))/2,y),value,font=f,fill=fill)

def alpha_paste(base,layer,alpha):
 if alpha<=0:return
 if alpha<1:layer.putalpha(layer.getchannel('A').point(lambda v:int(v*alpha)))
 base.alpha_composite(layer)

assets = {entry['slug']: entry for entry in json.loads((ROOT/'content/work.json').read_text())}
temp = tempfile.TemporaryDirectory(prefix='portfolio-promos-')
for slug,name,headline,bg,accent,fg,features,domain in configs:
 logo_path = Path(temp.name)/f'{slug}.png'
 subprocess.run(['node','-e',"require('sharp')(process.argv[1]).resize(200,200,{fit:'contain',background:'#00000000'}).png().toFile(process.argv[2]).catch(e=>{console.error(e);process.exit(1)})",str(ROOT/'public'/assets[slug]['icon'].lstrip('/')),str(logo_path)],cwd=ROOT,check=True)
 screenshot=Image.open(ROOT/f'public/previews/products/{slug}.jpg').convert('RGB')
 logo=Image.open(logo_path).convert('RGBA')
 output=ROOT/f'public/promos/{slug}.mp4'
 proc=subprocess.Popen(['ffmpeg','-y','-loglevel','error','-f','rawvideo','-vcodec','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r',str(FPS),'-i','-','-an','-c:v','libx264','-preset','medium','-crf','24','-pix_fmt','yuv420p','-movflags','+faststart',str(output)],stdin=subprocess.PIPE)
 for frame in range(FPS*DURATION):
  t=frame/FPS; base=Image.new('RGBA',(W,H),bg); d=ImageDraw.Draw(base)
  # Fine orbital strokes give the brand introduction a quiet sense of motion.
  ring=Image.new('RGBA',(W,H)); rd=ImageDraw.Draw(ring)
  for i in range(3):
   r=145+i*50+math.sin(t*.8+i)*8
   rd.ellipse((W/2-r,H/2-r,W/2+r,H/2+r),outline=accent,width=1)
  alpha_paste(base,ring,.13)
  intro=Image.new('RGBA',(W,H)); di=ImageDraw.Draw(intro)
  sz=int(95+10*ease(t)); mark=logo.resize((sz,sz),Image.Resampling.LANCZOS)
  intro.alpha_composite(mark,((W-sz)//2,103))
  centered(di,229,name,fg,54,serif); centered(di,309,headline,fg,25)
  centered(di,428,domain,accent,18,bold)
  intro_alpha=1 if t<1.4 else max(0,1-(t-1.4)/.55)
  alpha_paste(base,intro,intro_alpha)
  if 1.4<t<7.6:
   scene=Image.new('RGBA',(W,H)); sd=ImageDraw.Draw(scene)
   shift=int((1-ease((t-1.4)/.65))*65)
   mark=logo.resize((45,45),Image.Resampling.LANCZOS);scene.alpha_composite(mark,(36,28))
   text(sd,(94,30),name,fg,28,bold); text(sd,(740,40),'PRODUCT IN FOCUS',accent,11,bold)
   # Website capture stays original; only its framing and movement change.
   x,y=36,110+shift; sw=620; sh=350
   sd.rounded_rectangle((x-1,y-22,x+sw+1,y+sh+1),radius=12,fill='#ffffff')
   for dot in range(3):sd.ellipse((x+12+dot*12,y-13,x+17+dot*12,y-8),fill='#b9bebd')
   text(sd,(x+260,y-19),domain,'#65716b',10)
   zoom=1+.035*ease((t-1.8)/5)
   pic=screenshot.resize((int(sw*zoom),int(sw*zoom*screenshot.height/screenshot.width)),Image.Resampling.LANCZOS)
   pic=ImageOps.fit(pic,(sw,sh),centering=(.5,.15+.25*ease((t-1.8)/5)))
   scene.paste(pic,(x,y))
   text(sd,(692,112),'MADE FOR',accent,11,bold)
   for idx,feature in enumerate(features):
    progress=ease((t-2.0-idx*1.1)/.55)
    if progress>0:
     chip=Image.new('RGBA',(W,H)); cd=ImageDraw.Draw(chip)
     yy=155+idx*98+int((1-progress)*15)
     cd.ellipse((692,yy,722,yy+30),fill=accent)
     text(cd,(702,yy+6),str(idx+1),bg,15,bold)
     for line_no,line in enumerate(textwrap.wrap(feature,width=16)):
      text(cd,(692,yy+40+line_no*20),line,fg,17,bold)
     alpha_paste(scene,chip,progress)
   text(sd,(36,502),headline,fg,26,serif)
   text(sd,(36,555),'EXPLORE THE PRODUCT',accent,11,bold)
   scene_alpha=min(ease((t-1.4)/.6),max(0,(7.6-t)/.5))
   alpha_paste(base,scene,scene_alpha)
  if t>7.1:
   end=Image.new('RGBA',(W,H)); ed=ImageDraw.Draw(end)
   mark=logo.resize((80,80),Image.Resampling.LANCZOS); end.alpha_composite(mark,(440,105))
   centered(ed,220,headline,fg,35,serif)
   ed.rounded_rectangle((310,335,650,391),radius=28,fill=accent)
   centered(ed,350,domain,bg,22,bold)
   centered(ed,462,'Created by Ahmed Elshahawy',fg,15)
   alpha_paste(base,end,ease((t-7.1)/.5))
  # A subtle timeline makes the short sequence legible without sound.
  ImageDraw.Draw(base).rectangle((0,H-3,int(W*t/DURATION),H),fill=accent)
  if frame==int(4.7*FPS):base.convert('RGB').save(ROOT/f'public/promos/{slug}.jpg',quality=90)
  proc.stdin.write(base.convert('RGB').tobytes())
 proc.stdin.close()
 if proc.wait()!=0:raise RuntimeError(f'ffmpeg failed: {slug}')
 print(f'{slug}: {output.stat().st_size//1024} KB',flush=True)
