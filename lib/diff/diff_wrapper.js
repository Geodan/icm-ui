/* 
Creates a wrapper function for the diff_match_patch.js
with default values for the parameters 

returns a diff of an old and new text. 
Deleted strings are wrapped within a <del> 
and added strings are wrapped within a <ins>

*/
function TextDifference(oldText, newText) {
    var oldtTextClean = (oldText + '').replace(/<br\/>/g,'<br>');
    var newTextClean = (newText + '').replace(/<br\/>/g,'<br>');

    var dmp = new diff_match_patch();
    dmp.Diff_Timeout = parseFloat(0);
    dmp.Diff_EditCost = parseFloat(4);

    var d = dmp.diff_main(oldtTextClean, newTextClean);
    
    dmp.diff_cleanupSemantic(d);
    //dmp.diff_cleanupEfficiency(d);

    var result = '';

    for (var i=0; i < d.length; i++)
    {
        var begin = '';
        var end = '';

        if (d[i][1] !== undefined && d[i][1] !== '') {
            d[i][1] = d[i][1] + '';

            //keeping html-tags together
            if (i < d.length-2 && d[i + 2][1].substring(0,2) == '/>' && d[i + 2][0] == 0 && d[i][0] !== 0) {
                //verwijderde en ingevoegde tag, sluitingshaak is nodig voor beide tags
                d[i + 2][1] = d[i + 2][1].substring(2);
                d[i + 1][1] += '/>';
                d[i][1] += '/>';
            } else if (i < d.length-2 && d[i + 2][1].substring(0,1) == '>' && d[i + 2][0] == 0 && d[i][0] !== 0) {
                //verwijderde en ingevoegde tag, sluitingshaak is nodig voor beide tags
                d[i + 2][1] = d[i + 2][1].substring(1);
                d[i + 1][1] += '>';
                d[i][1] += '>';
            }
            else if (i < d.length-1 && d[i + 1][1].substring(0,1) == '>') {
                d[i + 1][1] = d[i + 1][1].substring(1);
                d[i][1] += '>';
            } else if (i < d.length-1 && d[i + 1][1].substring(0,2) == '/>') {
                d[i + 1][1] = d[i + 1][1].substring(2);
                d[i][1] += '/>';
            } else if (i < d.length-1 && d[i + 1][1].substring(0,2) == 'r>') {
                //overgang bold naar break?
                d[i + 1][1] = d[i + 1][1].substring(2);
                d[i][1] += 'r>';
            } else if (i < d.length-2 && d[i + 1][1] == 'r' && d[i + 2][1].substring(0,1) == '>') {
                //overgang break naar bold
                var boldCorrection = '';
                if (d[i + 1][0] === -1)
                {
                    boldCorrection = '<b>';
                }

                d[i][1] += 'r>'+ boldCorrection;
                d[i + 1][1] = d[i + 1][1].substring(1);
                d[i + 2][1] = d[i + 2][1].substring(1);
            }

            //Eindigen op <
            if (d[i][1].substring(d[i][1].length -1,d[i][1].length) == '<') {
                if (i < d.length-2 && d[i][0] === 0 && d[i + 2][0] !== 0)
                {
                    d[i+2][1] = '<' + d[i+2][1];
                }
                d[i][1] = d[i][1].substring(0,d[i][1].length -1);
                d[i+1][1] = '<' + d[i+1][1];
            } else if (d[i][1].substring(d[i][1].length -2,d[i][1].length) == '</') {
                if (i < d.length-2 && d[i][0] === 0 && d[i + 2][0] !== 0)
                {
                    d[i+2][1] = '</' + d[i+2][1];
                }
                d[i][1] = d[i][1].substring(0,d[i][1].length -2);
                d[i+1][1] = '</' + d[i+1][1];
            }

            if (d[i][0] === -1){
                result += digestDel(d[i][1]); //begin + '<del>' + d[i][1] + '</del>' + end;
            } else if (d[i][0] === 1){
                result += digestInsert(d[i][1]); //'<ins>' + d[i][1] + '</ins>';
            } else {
                result += d[i][1];
            }
        }
    }
    //TODO niet steeds nieuw element maken, maar één gebruiken.
    var doc = document.createElement('div');
    doc.innerHTML = result;

    if (result === doc.innerHTML) {
        return result;
    }
    //return '<i>Let op: de vergelijking met het vorige bericht is mislukt!</i><br><br>' + newText;
    return result;
}

function digestDel(text){
    var result = '';
    var index  = text.indexOf('<');

    if (index > -1)
    {
        var snippets = text.split('<');
        for (var i = 0; i < snippets.length; i++)
        {
            var indexGT = snippets[i].indexOf('>');
            if (indexGT > -1) {
                result += '<del>' + snippets[i].substring(indexGT +1) + '</del>';
            } else {
                result += '<del>' + snippets[i] + '</del>';
            }
        }
    } else {
        result = '<del>' + text + '</del>';
    }

    //remove empty tags
    result = result.replace(/<del><\/del>/g,'');

    return result;
}

function digestInsert(text){
    var result = '';
    var index  = text.indexOf('<');
    if (index > -1)
    {
        var snippets = text.split('<');
        for (var i = 0; i < snippets.length; i++)
        {
            var indexGT = snippets[i].indexOf('>');
            if (indexGT > -1) {
                //links should work after insert, they should stay within ins-tags, all other tags should be outside ins-tags
                if (snippets[i].substring(0,6) === 'a href') {
                    result += '<ins>' + '<'  + snippets[i];
                } else if (snippets[i].substring(0,3) === '/a>') {
                    result += '<'  + snippets[i] + '</ins>';
                } else
                    result += '<' + snippets[i].substring(0,indexGT + 1) + '<ins>' + snippets[i].substring(indexGT +1) + '</ins>';
            } else {
                result += '<ins>' + snippets[i] + '</ins>';
            }
        }
    } else {
        result = '<ins>' + text + '</ins>';
    }

    //remove empty tags
    result = result.replace(/<ins><\/ins>/g,'');

   return result;
}