if defined(wasm32):
  --cpu: wasm32
  --cc: clang
  #when defined(windows):
    #--clang.linkerexe: wasm-ld # Replace C linker
  #else:
    #--clang.linkerexe: wasm-ld
  --listCmd
  --noMain
  --gc: arc # GC:arc is friendlier with crazy platforms.
  --exceptions: goto # Goto exceptions are friendlier with crazy platforms.
  --define: noSignalHandler # Emscripten doesn't support signal handlers.

  # Pass this to clang linker
  let c = "-nostartfiles -Wl,--import-memory -Wl,--no-entry -Wl,--export-all --target=wasm32-unknown-wasi --sysroot=/usr/share/wasi-sysroot "
  switch("passC", c & "-D_WASI_EMULATED_MMAN")
  switch("passL", c & "-lwasi-emulated-mman")
