cd generator/latex

pandoc -s Report.tex -o ../index.html --self-contained --number-sections --citeproc