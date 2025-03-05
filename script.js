document.addEventListener("DOMContentLoaded", () => {
    const issueTitle = document.getElementById("issue-title");
    const pdfViewer = document.getElementById("pdf-viewer");
    const downloadLink = document.getElementById("download-link");

    let urlParams = new URLSearchParams(window.location.search);
    let issue = urlParams.get("issue");

    // Mapeamento de edições
    let issuesMap = {
        "1": "612" // Exemplo: Se adicionar mais edições, mapeie aqui
    };

    if (issue && issuesMap[issue]) {
        let issueNumber = issuesMap[issue];
        let pdfUrl = `pdfs/issue${issueNumber}.pdf`;

        // Atualiza os elementos da página
        issueTitle.innerText = `Edição ${issueNumber}`;
        pdfViewer.src = pdfUrl;
        downloadLink.href = pdfUrl;
        
        // Exibe os elementos caso estejam escondidos
        pdfViewer.style.display = "block";
        downloadLink.style.display = "inline-block";
    } else {
        issueTitle.innerText = "Edição não encontrada";
        pdfViewer.style.display = "none";
        downloadLink.style.display = "none";
    }
});
