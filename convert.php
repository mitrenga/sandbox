<!doctype html>
<html>
  <head>
    <title>CONVERT</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    </head>
  <body>
    <script src="convert.js"></script>        
    <h2><a href="<?php echo $webURL; ?>">↵</a> CONVERT</h2>
    <textarea id="input"></textarea><br>
    <label for="sprite-dimension">sprite dimension: </label><select id="sprite-dimension"><option value="0808x1">8 x 8</option><option value="1616x1" selected>16 x 16</option><option value="1616x2">32 x 32</option></select><br>
    <label for="number-system">number system: </label><select id="number-system"><option value="10">decimal</option><option value="16" selected>hexadecimal</option></select><br>
    <label for="separator">separator: </label><select id="separator"><option value="," selected>,</option><option value=";">;</option><option value=":">:</option><option value=".">.</option></select><br>
    <label for="mirror">mirror: </label><input type="checkbox" id="mirror"><br>
    <button id="input" onclick="convert()">MAKE SPRITE</button><br><br>
    <div id="result"></div>
  </body>
</html>