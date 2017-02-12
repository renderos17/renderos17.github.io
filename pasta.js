var interval = 10;
var ewig = "";
var holder ="";

    function permuter(word) {
        var ind=0;
        var gate=0;
        var next = 0;
        var permuda = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
        word = word.toLowerCase();
        var polygon = [];
        for (ind=0; ind<word.length;ind++) {
            polygon[ind] = word.charCodeAt(ind) - 97;
        }
        if (polygon[polygon.length-1]<25) {
            polygon[polygon.length-1]++;}
        else {
            polygon[polygon.length-1]=0;
            for (ind = polygon.length-2; ind>-1; ind--){
                if(polygon[ind]<25) {polygon[ind]++; gate++; break;}
                else {polygon[ind]=0;}
            }
            if (gate==0) {polygon.unshift(0);}
        }
        holder = permuda[polygon[0]].toUpperCase();
        for     (ind = 1; ind < polygon.length; ind++) {
            holder= holder + permuda[polygon[ind]];
        }
        console.log(interval);
        return holder;
    }

    function permuteAll(eyedeeone, eyedeetwo) {
        permute(eyedeeone);
        permute(eyedeetwo);
    }

    function permute(eyedee) {
        var word1=document.getElementById(eyedee).innerHTML;
        ewig = setInterval(function() {document.getElementById(eyedee).innerHTML = permuter(word1); word1=holder;}, interval);
    }
    function unpermute(term,eyedee) {
        clearInterval(ewig);
        document.getElementById(eyedee).innerHTML = term;
    }