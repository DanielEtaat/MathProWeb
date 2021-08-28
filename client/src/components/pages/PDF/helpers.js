export const prepareLatex = (latex) => {
    /* Adds '$' delimiters around latex expressions (excluding \\text{} elements). */
    if (latex === null) {
        return;
    }
    
    var preparedLatex = "";
    var correcting = false;
    
    while (latex.length > 0) {
        var textStart = latex.indexOf("\\text{");
        if (textStart === -1) {
            preparedLatex += correcting ? latex + "$" : "$" + latex + "$";
            break;
        }
    
        if (textStart !== 0) {
        preparedLatex += correcting
            ? latex.slice(0, textStart + 6)
            : "$" + latex.slice(0, textStart) + "$";
        }
        latex = latex.slice(textStart + 6);
    
        // Correcting for joined text-latex expressions (i.e "\\text{f(} x \\text{)}")
        var textEnd = latex.indexOf("}");
        if (correcting) {
            var correctEnd = latex.slice(0, textEnd).indexOf(" ");
            if (correctEnd === -1) {
                correctEnd = textEnd;
            }
            preparedLatex += latex.slice(0, correctEnd) + "}$";
            latex = latex.slice(correctEnd);
            correcting = false;
        }
    
        // var textEnd = latex.indexOf("}");
        if (textEnd > 0 && latex[textEnd - 1] === "(") {
            // TODO: check if the condition should be latex[textEnd-1] !== " "
            var nearTextEnd = latex.slice(0, textEnd).lastIndexOf(" ");
            preparedLatex += latex.slice(0, nearTextEnd + 1);
            preparedLatex += "$\\text{" + latex.slice(nearTextEnd + 1, textEnd + 1);
            correcting = true;
        } else {
            preparedLatex += latex.slice(0, textEnd);
        }
    
        latex = latex.slice(textEnd + 1);
    }

    return preparedLatex;
}