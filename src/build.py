import os
d=os.path.dirname(os.path.abspath(__file__))+'/'
css=open(d+'styles.css').read(); body=open(d+'body.html').read()
js=''.join(open(d+f).read()+'\n' for f in ['data.js','sim.js','app.js','chat.js'])
head='''<title>Decision Simulator</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;1,9..144,300&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap">
<style>
'''+css+'''
</style>
'''
open(d+'../index.html','w').write(head+body+'<script>\n'+js+'</script>\n')
