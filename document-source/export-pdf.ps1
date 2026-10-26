$ErrorActionPreference='Stop'
$directory=Join-Path $PSScriptRoot '../dist/assets/documents'
$word=New-Object -ComObject Word.Application
$word.Visible=$false
$word.DisplayAlerts=0
try {
 foreach($file in (Get-ChildItem -LiteralPath $directory -Filter '*.docx')){
  $document=$word.Documents.Open($file.FullName,$false,$true)
  try{$document.ExportAsFixedFormat([System.IO.Path]::ChangeExtension($file.FullName,'.pdf'),17)}finally{$document.Close(0)}
 }
}finally{$word.Quit()}
$archive=Join-Path $directory 'Krystyna-Mishchenko-CV-and-Artistic-Journey-5-languages.zip'
$files=Get-ChildItem -LiteralPath $directory -File | Where-Object {$_.Extension -in '.docx','.pdf'}
Compress-Archive -LiteralPath $files.FullName -DestinationPath $archive -Force
