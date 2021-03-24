var pretext, counts, uniqCount;

document.querySelector('#show_output').onclick = function() {

    count();

    text = '';
    temtext1 = '';
    temtext2 = '';
    temtext3 = '';

    if (pretext.slice(-1) !== ',') {
      pretext += ",";
    }

    var temtext1 = pretext.replace(/、|，/g, ',');

    var temtext2 = temtext1.replace(/,\s/g, '#3#w#q#');

    var temtext3 = temtext2.replace(/\s/g, ',\n');

    var text = temtext3.replace(/#3#w#q#/g, ',\n');


    if (!text.replace(/\s|,/g, '').length) {
      document.querySelector('#incount').innerText = 0;
      out0count()
      return;
    }


    document.querySelector('#incount').innerText = text.replace(/[^","]/g, "").length;


    let availableData = text;
    let desiredData = replaceCommaLine(availableData);
    function replaceCommaLine(data) {
        let dataToArray = data.split(',').map(item => item.trim());
        return dataToArray.join(",\n");
    }
    console.log(desiredData);

    var uniqueLines = [];

    var input = desiredData.split('\n');

    for (let line of input) {
        if (uniqueLines.indexOf(line) === -1) {
            uniqueLines.push(line)
        }
    }

    var uniqueLinesText = '';
    for (let uniqueLine of uniqueLines) {
        uniqueLinesText += uniqueLine + '\n';
    }

//    document.querySelector('#outcount').innerText = uniqueLines.length - 1;


    var sorting = uniqueLinesText;
    if (sorting) {
      sorting = sorting.split('\n').map(function (item) {
        return item.trim()
      });
      sorting = sorting.sort(function (a, b) {
        return a.length - b.length
      }).join('\n');
    }
        console.log(sorting);


//    if (sorting.slice(3, 4) === ',\n') {
//    }
    var sorting = sorting.replace(/^\s+/, "");
    var sorting = sorting.replace(/^,\s+/, "");

    document.querySelector('#output').value = sorting;

    document.querySelector('#outcount').innerText = sorting.replace(/[^","]/g, "").length;

}



document.querySelector('#clear').onclick = function() {
  clear()
}


function clear() {
  pretext = '';
  counts = [];
  uniqCount = [];
  document.querySelector('#incount').innerText = 0;
  document.querySelector('#outcount').innerText = 0;
  document.querySelector('#input').value = '';
  document.querySelector('#output').value = '';
}


function init() {
  document.querySelector('#incount').innerText = 0;
  document.querySelector('#input').value = '';
  out0count()
  }

window.onload = init;




// avoid unexpected output overwriting by pressing Enter key

// var keyinput = document.getElementById("input");
//
// keyinput.addEventListener("keyup", function(event) {
//   if (event.keyCode === 13) {
//     event.preventDefault();
//     document.getElementById("show_output").click();
//   }
// });


function out0count() {
  output0count = [];
  output0count = document.querySelector('#output').value;
  document.querySelector('#outcount').innerText = output0count.replace(/[^","]/g, "").length;
}




function count() {
    pretext = '';
    counts = [];
    uniqCount = [];

    document.querySelector('#incount').innerText = 0;
    document.querySelector('#outcount').innerText = 0;
    pretext = document.querySelector('#input').value;



    if (!pretext) return;

    var input = pretext.split('\n');

    if (input.length <= 1) return;

    var dupesFound = false;

    for (let line of input) {
        let dupe = counts.find(count => count.line === line);
        if (dupe && (line !== '')) {
            dupe.count++;
            dupesFound = true;
        } else {
            counts.push({
                line: line,
                count: 1
            });
        }
    }


    if (!dupesFound) return;

    counts = counts.filter(function(count) {
        if (count.count === 1) uniqCount.push(count.line);
        return count.count !== 1;
    });

}
