cd generator/latex

pandoc -s DraftReport.tex -o ../index.html --self-contained --number-sections --citeproc