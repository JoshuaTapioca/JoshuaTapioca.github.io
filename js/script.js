var text, counts, uniqCount;

document.querySelector('#output').onclick = function() {

    count();

    text += ",";

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


    document.querySelector('#totaled').innerText = uniqueLines.length - 1;


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

    document.querySelector('#result').value = sorting.slice(2);

}



document.querySelector('#clear').onclick = function() {
  text = '';
  counts = [];
  uniqCount = [];
  document.querySelector('#incount').innerText = 0;
  document.querySelector('#totaled').innerText = 0;
  document.querySelector('#input').value = '';
  document.querySelector('#result').value = '';
}



function init() {
    document.getElementById("clear").click();
  }

window.onload = init;



// avoid unexpected output overwriting by pressing Enter key

// var keyinput = document.getElementById("input");
//
// keyinput.addEventListener("keyup", function(event) {
//   if (event.keyCode === 13) {
//     event.preventDefault();
//     document.getElementById("output").click();
//   }
// });



// ----------------------------------------------


function count() {
    text = '';
    counts = [];
    uniqCount = [];

    document.querySelector('#incount').innerText = 0;
    document.querySelector('#totaled').innerText = 0;
    text = document.querySelector('#input').value;



    if (!text) return;

    var input = text.split('\n');
    document.querySelector('#totaled').innerText = input.length;

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
