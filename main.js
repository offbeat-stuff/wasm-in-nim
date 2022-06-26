let funs = ["args_get",
"args_sizes_get",
"environ_get",
"environ_sizes_get",
"clock_res_get",
"clock_time_get",
"fd_advise",
"fd_allocate",
"fd_close",
"fd_datasync",
"fd_fdstat_get",
"fd_fdstat_set_flags",
"fd_fdstat_set_rights",
"fd_filestat_get",
"fd_filestat_set_size",
"fd_filestat_set_times",
"fd_pread",
"fd_prestat_get",
"fd_prestat_dir_name",
"fd_pwrite",
"fd_read",
"fd_readdir",
"fd_renumber",
"fd_seek",
"fd_sync",
"fd_tell",
"fd_write",
"path_create_directory",
"path_filestat_get",
"path_filestat_set_times",
"path_link",
"path_open",
"path_readlink",
"path_remove_directory",
"path_rename",
"path_symlink",
"path_unlink_file",
"poll_oneoff",
"proc_exit",
"proc_raise",
"sched_yield",
"random_get",
"sock_recv",
"sock_send",
"sock_shutdown"
];
var wasi = {};
funs.forEach((i) => {
  wasi[i] = () => {};
})

async function init() {
  const memory = new WebAssembly.Memory({ initial: 2 });
  const response = await fetch('./add.wasm');
  const bytes = await response.arrayBuffer();
  const { instance } = await WebAssembly.instantiate(bytes, {
          env: { memory },
          wasi_snapshot_preview1: wasi
        });
  console.log(instance.exports);
  console.log(instance.exports.add(1,2));
}

init();
