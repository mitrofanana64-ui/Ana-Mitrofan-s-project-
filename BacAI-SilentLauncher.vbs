Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = "C:\Users\ancap\OneDrive\Desktop\website\bac-ai"
WshShell.Run """C:\Users\ancap\OneDrive\Desktop\website\bac-ai\keep-alive.cmd""", 0, False
Set WshShell = Nothing
