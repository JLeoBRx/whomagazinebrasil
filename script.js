document.addEventListener("DOMContentLoaded", () => {
    const issueContainer = document.getElementById("issue-container");
    const issueTitle = document.getElementById("issue-title");
    const canvas = document.getElementById("pdf-render");
    const ctx = canvas.getContext("2d");
    const prevBtn = document.getElementById("prev-page");
    const nextBtn = document.getElementById("next-page");
    const pageInfo = document.getElementById("page-info");

    let urlParams = new URLSearchParams(window.location.search);
    let issue = urlParams.get("issue");
    let pageNum = 1;
    let pdfDoc = null;
    let pageIsRendering = false;

    if (issue) {
        document.querySelector(".container").classList.add("hidden");
        issueContainer.classList.remove("hidden");
        issueTitle.innerText = `Edição ${issue}`;

        let pdfUrl = `pdfs/issue${issue}_page${pageNum}.pdf`;

        pdfjsLib.getDocument(pdfUrl).promise.then(pdf => {
            pdfDoc = pdf;
            renderPage(pageNum);
        });
    }

    function renderPage(num) {
        pageIsRendering = true;

        pdfDoc.getPage(num).then(page => {
            const viewport = page.getViewport({ scale: 1.5 });
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            const renderContext = {
                canvasContext: ctx,
                viewport: viewport
            };

            page.render(renderContext).promise.then(() => {
                pageIsRendering = false;
                pageInfo.innerText = `Página ${num} de ${pdfDoc.numPages}`;
            });
        });
    }

    prevBtn.addEventListener("click", () => {
        if (pageNum > 1) {
            pageNum--;
            renderPage(pageNum);
        }
    });

    nextBtn.addEventListener("click", () => {
        if (pageNum < pdfDoc.numPages) {
            pageNum++;
            renderPage(pageNum);
        }
    });
});
