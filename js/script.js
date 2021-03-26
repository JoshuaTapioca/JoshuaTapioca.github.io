var pretext, counts, uniqCount;

document.querySelector('#show_output').onclick = function() {
  if (document.querySelector('#editcount').innerText > 7) {
    document.getElementById("showalart").style.display = 'block';
    var eventcounter = 2;
    document.querySelector('#eventcounter').innerText = eventcounter;
    return;
  }
  showoutput();
}

function showoutput() {
  sessionStorage.setItem("autosave", '');
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
    recount();
    return;
  }

  countclear();
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


  var sorting = sorting.replace(/^\s+/, "");
  var sorting = sorting.replace(/^,\s+/, "");

  document.querySelector('#output').value = sorting;

  document.querySelector('#outcount').innerText = sorting.replace(/[^","]/g, "").length;

  sessionStorage.setItem("autosave", field.value);
}


// window.onbeforeunload = function() {
//   if (document.querySelector('#editcount').innerText > 7) {
//    return "output changed";
//  }
// };


document.querySelector('#clear').onclick = function() {
  if (document.querySelector('#editcount').innerText > 7) {
    document.getElementById("showalart").style.display = 'block';
    var eventcounter = 1;
    document.querySelector('#eventcounter').innerText = eventcounter;
    return;
  }
  realclear();
}

var eventcounter = 0;

document.querySelector('#dismiss').onclick = function() {
  document.getElementById("showalart").style.display = 'none';
  document.querySelector('#editcount').innerText = 0;


  if (document.querySelector('#eventcounter').innerText == 1) {
    realclear();
  }

  if (document.querySelector('#eventcounter').innerText == 2) {
    showoutput();
  }
}



function countclear() {
  innercounter = 0;
  eventcounter = 0;
  document.querySelector('#eventcounter').innerText = 0;
  document.querySelector('#incount').innerText = 0;
  document.querySelector('#outcount').innerText = 0;
  document.querySelector('#editcount').innerText = 0;
}


function realclear() {
  pretext = '';
  counts = [];
  uniqCount = [];
  innercounter = 0;
  eventcounter = 0;
  document.querySelector('#eventcounter').innerText = 0;
  document.querySelector('#incount').innerText = 0;
  document.querySelector('#outcount').innerText = 0;
  document.querySelector('#editcount').innerText = 0;
  document.querySelector('#input').value = '';
  document.querySelector('#output').value = '';

  sessionStorage.setItem("autosave", '');
}



let field = document.getElementById("output");

document.querySelector('#output').addEventListener("input", function() {
  sessionStorage.setItem("autosave", field.value);
});


function refresh() {
  document.querySelector('#incount').innerText = 0;
  document.querySelector('#input').value = '';

  if (sessionStorage.getItem("autosave")) {
    // Restore the contents of the text field
    document.querySelector('#output').value = sessionStorage.getItem("autosave");
  }
}

window.onload = refresh;



var innercounter = 0;

document.getElementById("output").addEventListener("input",function () {
  document.querySelector('#editcount').innerText = 0;
  innercounter += 1;
  document.querySelector('#editcount').innerText = innercounter;

  outrecount = document.querySelector('#output').value;
//  var outrecount = outrecount.replace(/、|，/g, ',');
//  document.querySelector('#output').value = outrecount;
  document.querySelector('#outcount').innerText = outrecount.replace(/[^","]/g, "").length;
})


// var keyinput = document.getElementById("input");
//
// keyinput.addEventListener("keyup", function(event) {
//   if (event.keyCode === 13) {
//     event.preventDefault();
//     document.getElementById("show_output").click();
//   }
// });


function recount() {
  document.querySelector('#input').value = document.querySelector('#output').value;
  document.getElementById("show_output").click();

  pretext = '';
  counts = [];
  uniqCount = [];
  document.querySelector('#incount').innerText = 0;
  document.querySelector('#input').value = '';
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
