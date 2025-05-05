function convert() {
  var input = document.getElementById('input');
  var spriteDimension = document.getElementById('sprite-dimension');
  var numberSystem = document.getElementById('number-system');
  var separator = document.getElementById('separator');
  var mirror = document.getElementById('mirror'); // <= mirror.checked
  var result = document.getElementById('result');

  var spriteWidth = parseInt(spriteDimension.value.substr(0, 2), 10);
  var spriteHeight = parseInt(spriteDimension.value.substr(2, 2), 10);
  var spriteMultiplicator = parseInt(spriteDimension.value.substr(5, 1), 10);


  var data = input.value.replaceAll('\t', '').replaceAll(' ', '').replaceAll('$', '').replaceAll('\n', separator.value).replaceAll(separator.value+separator.value, separator.value);
  var find = data.search('DEFB');
  while (find > 3) {
    data = data.substr(0, find-4)+data.substr(find+4);
    find = data.search('DEFB');
  }
  var dataArray = data.split(separator.value);

  var binArray = [];
  for (var i = 0; i < dataArray.length; i++) {
    var intValue = parseInt(dataArray[i], numberSystem.value);
    binArray.push(intValue.toString(2).padStart(8, '0').replaceAll('0', '-').replaceAll('1', '#'));
  }

  var value = 0;
  var x = 0;
  var y = 0;
  var output = '<br><br>"sprite":[<br>&nbsp;&nbsp;[<br>';
  
  while (value < binArray.length) {
    if (x == 0) {
      output = output+'&nbsp;&nbsp;&nbsp;&nbsp;"';
    }
    output = output+binArray[value];
    value += 1;
    x += 8;
    if (x == spriteWidth) {
      output = output+'"';
      if (y < spriteHeight-1) {
        output = output+',';
      }
      output = output+'<br>';
      if (y == spriteHeight-1) {
        output = output+'&nbsp;&nbsp;]';
        if (value < binArray.length) {
          output = output+',';
        }
        output = output+'<br>';
      }
      x = 0;
      y++;
    }
    if (y == spriteHeight) {

      if (value < binArray.length) {
        output = output+'&nbsp;&nbsp;[<br>';
      }
      y = 0;
    }
  }
  output = output+']<br>';

  result.innerHTML = output;
}
