/* 
Creates a wrapper function for the diff_match_patch.js
with default values for the parameters 

returns a diff of an old and new text. 
Deleted strings are wrapped within a <del> 
and added strings are wrapped within a <ins>

*/
function TextDifference(oldText, newText) {
    var dmp = new diff_match_patch();
    dmp.Diff_Timeout = parseFloat(0);
    dmp.Diff_EditCost = parseFloat(4);

    var d = dmp.diff_main(oldText, newText);
    
    dmp.diff_cleanupSemantic(d);
    dmp.diff_cleanupEfficiency(d);

    var result = '';

    for (var i=0; i < d.length; i++)
    {
        if (d[i][0] === -1){
            result += '<del>' + d[i][1] + '</del>';
        } else if (d[i][0] === 1){
            result += '<ins>' + d[i][1] + '</ins>';
        } else {
            result += d[i][1];
        }
    }
    //var ds = dmp.diff_prettyHtml(d);
    return result;
}