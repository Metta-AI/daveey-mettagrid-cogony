// include: shell.js
// The Module object: Our interface to the outside world. We import
// and export values on it. There are various ways Module can be used:
// 1. Not defined. We create it here
// 2. A function parameter, function(Module) { ..generated code.. }
// 3. pre-run appended it, var Module = {}; ..generated code..
// 4. External script tag defines var Module.
// We need to check if Module already exists (e.g. case 3 above).
// Substitution will be replaced with actual code on later stage of the build,
// this way Closure Compiler will not mangle it (e.g. case 4. above).
// Note that if you want to run closure, and also to use Module
// after the generated code, you will need to define   var Module = {};
// before the code. Then that object will be used in the code, and you
// can continue to use Module afterwards as well.
var Module = typeof Module != 'undefined' ? Module : {};

// --pre-jses are emitted after the Module integration code, so that they can
// refer to Module (if they choose; they can also define Module)

  if (!Module.expectedDataFileDownloads) {
    Module.expectedDataFileDownloads = 0;
  }

  Module.expectedDataFileDownloads++;
  (function() {
    // Do not attempt to redownload the virtual filesystem data when in a pthread or a Wasm Worker context.
    if (Module['ENVIRONMENT_IS_PTHREAD'] || Module['$ww']) return;
    var loadPackage = function(metadata) {

      var PACKAGE_PATH = '';
      if (typeof window === 'object') {
        PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
      } else if (typeof process === 'undefined' && typeof location !== 'undefined') {
        // web worker
        PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
      }
      var PACKAGE_NAME = '/Users/daveey/code/cogame-cogony/.mettagrid/nim/mettascope/dist/mettascope.data';
      var REMOTE_PACKAGE_BASE = 'mettascope.data';
      if (typeof Module['locateFilePackage'] === 'function' && !Module['locateFile']) {
        Module['locateFile'] = Module['locateFilePackage'];
        err('warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)');
      }
      var REMOTE_PACKAGE_NAME = Module['locateFile'] ? Module['locateFile'](REMOTE_PACKAGE_BASE, '') : REMOTE_PACKAGE_BASE;
var REMOTE_PACKAGE_SIZE = metadata['remote_package_size'];

      function fetchRemotePackage(packageName, packageSize, callback, errback) {
        if (typeof process === 'object' && typeof process.versions === 'object' && typeof process.versions.node === 'string') {
          require('fs').readFile(packageName, function(err, contents) {
            if (err) {
              errback(err);
            } else {
              callback(contents.buffer);
            }
          });
          return;
        }
        var xhr = new XMLHttpRequest();
        xhr.open('GET', packageName, true);
        xhr.responseType = 'arraybuffer';
        xhr.onprogress = function(event) {
          var url = packageName;
          var size = packageSize;
          if (event.total) size = event.total;
          if (event.loaded) {
            if (!xhr.addedTotal) {
              xhr.addedTotal = true;
              if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
              Module.dataFileDownloads[url] = {
                loaded: event.loaded,
                total: size
              };
            } else {
              Module.dataFileDownloads[url].loaded = event.loaded;
            }
            var total = 0;
            var loaded = 0;
            var num = 0;
            for (var download in Module.dataFileDownloads) {
            var data = Module.dataFileDownloads[download];
              total += data.total;
              loaded += data.loaded;
              num++;
            }
            total = Math.ceil(total * Module.expectedDataFileDownloads/num);
            if (Module['setStatus']) Module['setStatus'](`Downloading data... (${loaded}/${total})`);
          } else if (!Module.dataFileDownloads) {
            if (Module['setStatus']) Module['setStatus']('Downloading data...');
          }
        };
        xhr.onerror = function(event) {
          throw new Error("NetworkError for: " + packageName);
        }
        xhr.onload = function(event) {
          if (xhr.status == 200 || xhr.status == 304 || xhr.status == 206 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
            var packageData = xhr.response;
            callback(packageData);
          } else {
            throw new Error(xhr.statusText + " : " + xhr.responseURL);
          }
        };
        xhr.send(null);
      };

      function handleError(error) {
        console.error('package error:', error);
      };

      var fetchedCallback = null;
      var fetched = Module['getPreloadedPackage'] ? Module['getPreloadedPackage'](REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE) : null;

      if (!fetched) fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, function(data) {
        if (fetchedCallback) {
          fetchedCallback(data);
          fetchedCallback = null;
        } else {
          fetched = data;
        }
      }, handleError);

    function runWithFS() {

      function assert(check, msg) {
        if (!check) throw msg + new Error().stack;
      }
Module['FS_createPath']("/", "packages", true, true);
Module['FS_createPath']("/packages", "mettagrid", true, true);
Module['FS_createPath']("/packages/mettagrid", "nim", true, true);
Module['FS_createPath']("/packages/mettagrid/nim", "mettascope", true, true);
Module['FS_createPath']("/packages/mettagrid/nim/mettascope", "data", true, true);
Module['FS_createPath']("/packages/mettagrid/nim/mettascope/data", "actions", true, true);
Module['FS_createPath']("/packages/mettagrid/nim/mettascope/data/actions", "icons", true, true);
Module['FS_createPath']("/packages/mettagrid/nim/mettascope/data", "agents", true, true);
Module['FS_createPath']("/packages/mettagrid/nim/mettascope/data", "amongus", true, true);
Module['FS_createPath']("/packages/mettagrid/nim/mettascope/data/amongus", "agents", true, true);
Module['FS_createPath']("/packages/mettagrid/nim/mettascope/data/amongus", "minimap", true, true);
Module['FS_createPath']("/packages/mettagrid/nim/mettascope/data/amongus", "objects", true, true);
Module['FS_createPath']("/packages/mettagrid/nim/mettascope/data/amongus", "profiles", true, true);
Module['FS_createPath']("/packages/mettagrid/nim/mettascope/data/amongus", "terrain", true, true);
Module['FS_createPath']("/packages/mettagrid/nim/mettascope/data", "effects", true, true);
Module['FS_createPath']("/packages/mettagrid/nim/mettascope/data", "fidget", true, true);
Module['FS_createPath']("/packages/mettagrid/nim/mettascope/data/fidget", "fonts", true, true);
Module['FS_createPath']("/packages/mettagrid/nim/mettascope/data/fidget", "images", true, true);
Module['FS_createPath']("/packages/mettagrid/nim/mettascope/data", "fonts", true, true);
Module['FS_createPath']("/packages/mettagrid/nim/mettascope/data", "icons", true, true);
Module['FS_createPath']("/packages/mettagrid/nim/mettascope/data/icons", "agents", true, true);
Module['FS_createPath']("/packages/mettagrid/nim/mettascope/data/icons", "objects", true, true);
Module['FS_createPath']("/packages/mettagrid/nim/mettascope/data", "minimap", true, true);
Module['FS_createPath']("/packages/mettagrid/nim/mettascope/data", "objects", true, true);
Module['FS_createPath']("/packages/mettagrid/nim/mettascope/data", "profiles", true, true);
Module['FS_createPath']("/packages/mettagrid/nim/mettascope/data", "replays", true, true);
Module['FS_createPath']("/packages/mettagrid/nim/mettascope/data", "resources", true, true);
Module['FS_createPath']("/packages/mettagrid/nim/mettascope/data", "sounds", true, true);
Module['FS_createPath']("/packages/mettagrid/nim/mettascope/data", "starfield", true, true);
Module['FS_createPath']("/packages/mettagrid/nim/mettascope/data", "terrain", true, true);
Module['FS_createPath']("/packages/mettagrid/nim/mettascope/data", "theme", true, true);
Module['FS_createPath']("/packages/mettagrid/nim/mettascope/data", "trace", true, true);
Module['FS_createPath']("/packages/mettagrid/nim/mettascope/data", "ui", true, true);
Module['FS_createPath']("/packages/mettagrid/nim/mettascope/data", "vibe", true, true);
Module['FS_createPath']("/packages/mettagrid/nim/mettascope/data", "view", true, true);

      /** @constructor */
      function DataRequest(start, end, audio) {
        this.start = start;
        this.end = end;
        this.audio = audio;
      }
      DataRequest.prototype = {
        requests: {},
        open: function(mode, name) {
          this.name = name;
          this.requests[name] = this;
          Module['addRunDependency'](`fp ${this.name}`);
        },
        send: function() {},
        onload: function() {
          var byteArray = this.byteArray.subarray(this.start, this.end);
          this.finish(byteArray);
        },
        finish: function(byteArray) {
          var that = this;
          // canOwn this data in the filesystem, it is a slide into the heap that will never change
          Module['FS_createDataFile'](this.name, null, byteArray, true, true, true);
          Module['removeRunDependency'](`fp ${that.name}`);
          this.requests[this.name] = null;
        }
      };

      var files = metadata['files'];
      for (var i = 0; i < files.length; ++i) {
        new DataRequest(files[i]['start'], files[i]['end'], files[i]['audio'] || 0).open('GET', files[i]['filename']);
      }

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer.constructor.name === ArrayBuffer.name, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        // Reuse the bytearray from the XHR as the source for file reads.
          DataRequest.prototype.byteArray = byteArray;
          var files = metadata['files'];
          for (var i = 0; i < files.length; ++i) {
            DataRequest.prototype.requests[files[i].filename].onload();
          }          Module['removeRunDependency']('datafile_/Users/daveey/code/cogame-cogony/.mettagrid/nim/mettascope/dist/mettascope.data');

      };
      Module['addRunDependency']('datafile_/Users/daveey/code/cogame-cogony/.mettagrid/nim/mettascope/dist/mettascope.data');

      if (!Module.preloadResults) Module.preloadResults = {};

      Module.preloadResults[PACKAGE_NAME] = {fromCache: false};
      if (fetched) {
        processPackageData(fetched);
        fetched = null;
      } else {
        fetchedCallback = processPackageData;
      }

    }
    if (Module['calledRun']) {
      runWithFS();
    } else {
      if (!Module['preRun']) Module['preRun'] = [];
      Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
    }

    }
    loadPackage({"files": [{"filename": "/packages/mettagrid/nim/mettascope/data/.cogony-assets-version", "start": 0, "end": 40}, {"filename": "/packages/mettagrid/nim/mettascope/data/README.md", "start": 40, "end": 523}, {"filename": "/packages/mettagrid/nim/mettascope/data/actions/arrow.png", "start": 523, "end": 1543}, {"filename": "/packages/mettagrid/nim/mettascope/data/actions/attack1.png", "start": 1543, "end": 9675}, {"filename": "/packages/mettagrid/nim/mettascope/data/actions/attack2.png", "start": 9675, "end": 16322}, {"filename": "/packages/mettagrid/nim/mettascope/data/actions/attack3.png", "start": 16322, "end": 24711}, {"filename": "/packages/mettagrid/nim/mettascope/data/actions/attack4.png", "start": 24711, "end": 34879}, {"filename": "/packages/mettagrid/nim/mettascope/data/actions/attack5.png", "start": 34879, "end": 42362}, {"filename": "/packages/mettagrid/nim/mettascope/data/actions/attack6.png", "start": 42362, "end": 52181}, {"filename": "/packages/mettagrid/nim/mettascope/data/actions/attack7.png", "start": 52181, "end": 63025}, {"filename": "/packages/mettagrid/nim/mettascope/data/actions/attack8.png", "start": 63025, "end": 70922}, {"filename": "/packages/mettagrid/nim/mettascope/data/actions/attack9.png", "start": 70922, "end": 81244}, {"filename": "/packages/mettagrid/nim/mettascope/data/actions/attack_nearest.png", "start": 81244, "end": 97394}, {"filename": "/packages/mettagrid/nim/mettascope/data/actions/converting.png", "start": 97394, "end": 109200}, {"filename": "/packages/mettagrid/nim/mettascope/data/actions/get_items.png", "start": 109200, "end": 112287}, {"filename": "/packages/mettagrid/nim/mettascope/data/actions/icons/attack.png", "start": 112287, "end": 116548}, {"filename": "/packages/mettagrid/nim/mettascope/data/actions/icons/attack_nearest.png", "start": 116548, "end": 124145}, {"filename": "/packages/mettagrid/nim/mettascope/data/actions/icons/change_color.png", "start": 124145, "end": 133045}, {"filename": "/packages/mettagrid/nim/mettascope/data/actions/icons/get_items.png", "start": 133045, "end": 136479}, {"filename": "/packages/mettagrid/nim/mettascope/data/actions/icons/move.png", "start": 136479, "end": 139388}, {"filename": "/packages/mettagrid/nim/mettascope/data/actions/icons/noop.png", "start": 139388, "end": 143192}, {"filename": "/packages/mettagrid/nim/mettascope/data/actions/icons/put_items.png", "start": 143192, "end": 146551}, {"filename": "/packages/mettagrid/nim/mettascope/data/actions/icons/rotate.png", "start": 146551, "end": 151805}, {"filename": "/packages/mettagrid/nim/mettascope/data/actions/icons/swap.png", "start": 151805, "end": 159425}, {"filename": "/packages/mettagrid/nim/mettascope/data/actions/icons/unknown.png", "start": 159425, "end": 162552}, {"filename": "/packages/mettagrid/nim/mettascope/data/actions/put_items.png", "start": 162552, "end": 165491}, {"filename": "/packages/mettagrid/nim/mettascope/data/actions/swap.png", "start": 165491, "end": 171868}, {"filename": "/packages/mettagrid/nim/mettascope/data/actions/thoughts.png", "start": 171868, "end": 174964}, {"filename": "/packages/mettagrid/nim/mettascope/data/actions/thoughts_lightning.png", "start": 174964, "end": 178291}, {"filename": "/packages/mettagrid/nim/mettascope/data/actions/unknown.png", "start": 178291, "end": 180215}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/agent.blue.e.png", "start": 180215, "end": 201580}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/agent.e.mask.png", "start": 201580, "end": 206478}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/agent.e.png", "start": 206478, "end": 230422}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/agent.n.mask.png", "start": 230422, "end": 234041}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/agent.n.png", "start": 234041, "end": 255060}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/agent.ne.mask.png", "start": 255060, "end": 261190}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/agent.ne.png", "start": 261190, "end": 287138}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/agent.nw.mask.png", "start": 287138, "end": 293041}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/agent.nw.png", "start": 293041, "end": 318062}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/agent.s.mask.png", "start": 318062, "end": 321544}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/agent.s.png", "start": 321544, "end": 340453}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/agent.se.mask.png", "start": 340453, "end": 345614}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/agent.se.png", "start": 345614, "end": 367749}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/agent.sw.mask.png", "start": 367749, "end": 372896}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/agent.sw.png", "start": 372896, "end": 394838}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/agent.w.mask.png", "start": 394838, "end": 399595}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/agent.w.png", "start": 399595, "end": 422553}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/aligner.e.mask.png", "start": 422553, "end": 427639}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/aligner.e.png", "start": 427639, "end": 458817}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/aligner.n.mask.png", "start": 458817, "end": 463070}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/aligner.n.png", "start": 463070, "end": 486546}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/aligner.ne.mask.png", "start": 486546, "end": 492969}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/aligner.ne.png", "start": 492969, "end": 523791}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/aligner.nw.mask.png", "start": 523791, "end": 529762}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/aligner.nw.png", "start": 529762, "end": 559292}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/aligner.s.mask.png", "start": 559292, "end": 563791}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/aligner.s.png", "start": 563791, "end": 587017}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/aligner.se.mask.png", "start": 587017, "end": 592307}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/aligner.se.png", "start": 592307, "end": 621162}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/aligner.sw.mask.png", "start": 621162, "end": 626060}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/aligner.sw.png", "start": 626060, "end": 653302}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/aligner.w.mask.png", "start": 653302, "end": 657955}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/aligner.w.png", "start": 657955, "end": 687758}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/arrow.png", "start": 687758, "end": 688206}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/barPip2x3.png", "start": 688206, "end": 688354}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/barPip2x3Bg.png", "start": 688354, "end": 688496}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/barPip3x4.png", "start": 688496, "end": 688651}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/barPip3x4Bg.png", "start": 688651, "end": 688795}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/barPip5x6.png", "start": 688795, "end": 688962}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/barPip5x6Bg.png", "start": 688962, "end": 689105}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/chef.e.mask.png", "start": 689105, "end": 694163}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/chef.e.png", "start": 694163, "end": 723008}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/chef.n.mask.png", "start": 723008, "end": 727263}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/chef.n.png", "start": 727263, "end": 754985}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/chef.ne.mask.png", "start": 754985, "end": 761151}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/chef.ne.png", "start": 761151, "end": 792665}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/chef.nw.mask.png", "start": 792665, "end": 798288}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/chef.nw.png", "start": 798288, "end": 826029}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/chef.s.mask.png", "start": 826029, "end": 830358}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/chef.s.png", "start": 830358, "end": 852550}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/chef.se.mask.png", "start": 852550, "end": 857685}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/chef.se.png", "start": 857685, "end": 883303}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/chef.sw.mask.png", "start": 883303, "end": 888387}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/chef.sw.png", "start": 888387, "end": 917271}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/chef.w.mask.png", "start": 917271, "end": 921941}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/chef.w.png", "start": 921941, "end": 951182}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/footprints.png", "start": 951182, "end": 951450}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/frozen.png", "start": 951450, "end": 956637}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/future_arrow.png", "start": 956637, "end": 957020}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/miner.e.mask.png", "start": 957020, "end": 964176}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/miner.e.png", "start": 964176, "end": 994662}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/miner.n.mask.png", "start": 994662, "end": 1001411}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/miner.n.png", "start": 1001411, "end": 1026614}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/miner.ne.mask.png", "start": 1026614, "end": 1034918}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/miner.ne.png", "start": 1034918, "end": 1064605}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/miner.nw.mask.png", "start": 1064605, "end": 1072054}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/miner.nw.png", "start": 1072054, "end": 1101448}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/miner.s.mask.png", "start": 1101448, "end": 1107974}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/miner.s.png", "start": 1107974, "end": 1135935}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/miner.se.mask.png", "start": 1135935, "end": 1143536}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/miner.se.png", "start": 1143536, "end": 1173008}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/miner.sw.mask.png", "start": 1173008, "end": 1179952}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/miner.sw.png", "start": 1179952, "end": 1210237}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/miner.w.mask.png", "start": 1210237, "end": 1217555}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/miner.w.png", "start": 1217555, "end": 1247839}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/miner_pickaxe.e.mask.png", "start": 1247839, "end": 1252577}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/miner_pickaxe.e.png", "start": 1252577, "end": 1280513}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/miner_pickaxe.n.mask.png", "start": 1280513, "end": 1284452}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/miner_pickaxe.n.png", "start": 1284452, "end": 1309610}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/miner_pickaxe.ne.mask.png", "start": 1309610, "end": 1314968}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/miner_pickaxe.ne.png", "start": 1314968, "end": 1342862}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/miner_pickaxe.nw.mask.png", "start": 1342862, "end": 1348256}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/miner_pickaxe.nw.png", "start": 1348256, "end": 1377038}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/miner_pickaxe.s.mask.png", "start": 1377038, "end": 1381479}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/miner_pickaxe.s.png", "start": 1381479, "end": 1404570}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/miner_pickaxe.se.mask.png", "start": 1404570, "end": 1409815}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/miner_pickaxe.se.png", "start": 1409815, "end": 1437283}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/miner_pickaxe.sw.mask.png", "start": 1437283, "end": 1442119}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/miner_pickaxe.sw.png", "start": 1442119, "end": 1467597}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/miner_pickaxe.w.mask.png", "start": 1467597, "end": 1472086}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/miner_pickaxe.w.png", "start": 1472086, "end": 1498101}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/past_arrow.png", "start": 1498101, "end": 1498483}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/path.ee.png", "start": 1498483, "end": 1498964}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/path.en.png", "start": 1498964, "end": 1499939}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/path.es.png", "start": 1499939, "end": 1500873}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/path.ne.png", "start": 1500873, "end": 1501847}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/path.nn.png", "start": 1501847, "end": 1502404}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/path.nw.png", "start": 1502404, "end": 1503377}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/path.png", "start": 1503377, "end": 1503631}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/path.se.png", "start": 1503631, "end": 1504595}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/path.ss.png", "start": 1504595, "end": 1505168}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/path.sw.png", "start": 1505168, "end": 1506139}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/path.wn.png", "start": 1506139, "end": 1507073}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/path.ws.png", "start": 1507073, "end": 1508045}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/path.ww.png", "start": 1508045, "end": 1508536}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/plan.e.png", "start": 1508536, "end": 1508912}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/plan.ee.png", "start": 1508912, "end": 1509299}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/plan.en.png", "start": 1509299, "end": 1509778}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/plan.es.png", "start": 1509778, "end": 1510261}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/plan.n.png", "start": 1510261, "end": 1510688}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/plan.ne.png", "start": 1510688, "end": 1511172}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/plan.nn.png", "start": 1511172, "end": 1511668}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/plan.nw.png", "start": 1511668, "end": 1512151}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/plan.s.png", "start": 1512151, "end": 1512578}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/plan.se.png", "start": 1512578, "end": 1513061}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/plan.ss.png", "start": 1513061, "end": 1513565}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/plan.sw.png", "start": 1513565, "end": 1514044}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/plan.w.png", "start": 1514044, "end": 1514424}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/plan.wn.png", "start": 1514424, "end": 1514907}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/plan.ws.png", "start": 1514907, "end": 1515391}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/plan.ww.png", "start": 1515391, "end": 1515779}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/scout.e.mask.png", "start": 1515779, "end": 1520701}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/scout.e.png", "start": 1520701, "end": 1551214}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/scout.n.mask.png", "start": 1551214, "end": 1555865}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/scout.n.png", "start": 1555865, "end": 1582236}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/scout.ne.mask.png", "start": 1582236, "end": 1587963}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/scout.ne.png", "start": 1587963, "end": 1618901}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/scout.nw.mask.png", "start": 1618901, "end": 1624013}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/scout.nw.png", "start": 1624013, "end": 1653712}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/scout.s.mask.png", "start": 1653712, "end": 1657070}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/scout.s.png", "start": 1657070, "end": 1681627}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/scout.se.mask.png", "start": 1681627, "end": 1685425}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/scout.se.png", "start": 1685425, "end": 1713901}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/scout.sw.mask.png", "start": 1713901, "end": 1717725}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/scout.sw.png", "start": 1717725, "end": 1745066}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/scout.w.mask.png", "start": 1745066, "end": 1749386}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/scout.w.png", "start": 1749386, "end": 1779510}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/scrambler.e.mask.png", "start": 1779510, "end": 1787773}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/scrambler.e.png", "start": 1787773, "end": 1820231}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/scrambler.n.mask.png", "start": 1820231, "end": 1828382}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/scrambler.n.png", "start": 1828382, "end": 1854537}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/scrambler.ne.mask.png", "start": 1854537, "end": 1863308}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/scrambler.ne.png", "start": 1863308, "end": 1897001}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/scrambler.nw.mask.png", "start": 1897001, "end": 1905371}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/scrambler.nw.png", "start": 1905371, "end": 1935268}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/scrambler.s.mask.png", "start": 1935268, "end": 1940556}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/scrambler.s.png", "start": 1940556, "end": 1964836}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/scrambler.se.mask.png", "start": 1964836, "end": 1971985}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/scrambler.se.png", "start": 1971985, "end": 2000553}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/scrambler.sw.mask.png", "start": 2000553, "end": 2007040}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/scrambler.sw.png", "start": 2007040, "end": 2034073}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/scrambler.w.mask.png", "start": 2034073, "end": 2041150}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/scrambler.w.png", "start": 2041150, "end": 2072100}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/tracks.ee.png", "start": 2072100, "end": 2092931}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/tracks.en.png", "start": 2092931, "end": 2109230}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/tracks.es.png", "start": 2109230, "end": 2124691}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/tracks.ew.png", "start": 2124691, "end": 2155915}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/tracks.ne.png", "start": 2155915, "end": 2171078}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/tracks.nn.png", "start": 2171078, "end": 2192513}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/tracks.ns.png", "start": 2192513, "end": 2226153}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/tracks.nw.png", "start": 2226153, "end": 2241476}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/tracks.se.png", "start": 2241476, "end": 2257938}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/tracks.sn.png", "start": 2257938, "end": 2291541}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/tracks.ss.png", "start": 2291541, "end": 2312837}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/tracks.sw.png", "start": 2312837, "end": 2328251}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/tracks.we.png", "start": 2328251, "end": 2359396}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/tracks.wn.png", "start": 2359396, "end": 2375721}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/tracks.ws-1.png", "start": 2375721, "end": 2403595}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/tracks.ws.png", "start": 2403595, "end": 2418218}, {"filename": "/packages/mettagrid/nim/mettascope/data/agents/tracks.ww.png", "start": 2418218, "end": 2439074}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/ballot_crewmate.e.png", "start": 2439074, "end": 2440239}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/ballot_crewmate.n.png", "start": 2440239, "end": 2441404}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/ballot_crewmate.ne.png", "start": 2441404, "end": 2442569}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/ballot_crewmate.nw.png", "start": 2442569, "end": 2443722}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/ballot_crewmate.s.png", "start": 2443722, "end": 2444887}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/ballot_crewmate.se.png", "start": 2444887, "end": 2446052}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/ballot_crewmate.sw.png", "start": 2446052, "end": 2447205}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/ballot_crewmate.w.png", "start": 2447205, "end": 2448358}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/ballot_impostor.e.png", "start": 2448358, "end": 2449515}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/ballot_impostor.n.png", "start": 2449515, "end": 2450672}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/ballot_impostor.ne.png", "start": 2450672, "end": 2451829}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/ballot_impostor.nw.png", "start": 2451829, "end": 2452989}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/ballot_impostor.s.png", "start": 2452989, "end": 2454146}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/ballot_impostor.se.png", "start": 2454146, "end": 2455303}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/ballot_impostor.sw.png", "start": 2455303, "end": 2456463}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/ballot_impostor.w.png", "start": 2456463, "end": 2457623}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/body_crewmate.e.png", "start": 2457623, "end": 2458661}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/body_crewmate.n.png", "start": 2458661, "end": 2459699}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/body_crewmate.ne.png", "start": 2459699, "end": 2460737}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/body_crewmate.nw.png", "start": 2460737, "end": 2461749}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/body_crewmate.s.png", "start": 2461749, "end": 2462787}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/body_crewmate.se.png", "start": 2462787, "end": 2463825}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/body_crewmate.sw.png", "start": 2463825, "end": 2464837}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/body_crewmate.w.png", "start": 2464837, "end": 2465849}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/body_impostor.e.png", "start": 2465849, "end": 2466889}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/body_impostor.n.png", "start": 2466889, "end": 2467929}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/body_impostor.ne.png", "start": 2467929, "end": 2468969}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/body_impostor.nw.png", "start": 2468969, "end": 2469988}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/body_impostor.s.png", "start": 2469988, "end": 2471028}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/body_impostor.se.png", "start": 2471028, "end": 2472068}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/body_impostor.sw.png", "start": 2472068, "end": 2473087}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/body_impostor.w.png", "start": 2473087, "end": 2474106}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/crewmate.e.png", "start": 2474106, "end": 2474809}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/crewmate.n.png", "start": 2474809, "end": 2475512}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/crewmate.ne.png", "start": 2475512, "end": 2476215}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/crewmate.nw.png", "start": 2476215, "end": 2476903}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/crewmate.s.png", "start": 2476903, "end": 2477606}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/crewmate.se.png", "start": 2477606, "end": 2478309}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/crewmate.sw.png", "start": 2478309, "end": 2478997}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/crewmate.w.png", "start": 2478997, "end": 2479685}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/discussion_crewmate.e.png", "start": 2479685, "end": 2480759}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/discussion_crewmate.n.png", "start": 2480759, "end": 2481833}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/discussion_crewmate.ne.png", "start": 2481833, "end": 2482907}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/discussion_crewmate.nw.png", "start": 2482907, "end": 2483975}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/discussion_crewmate.s.png", "start": 2483975, "end": 2485049}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/discussion_crewmate.se.png", "start": 2485049, "end": 2486123}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/discussion_crewmate.sw.png", "start": 2486123, "end": 2487191}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/discussion_crewmate.w.png", "start": 2487191, "end": 2488259}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/discussion_impostor.e.png", "start": 2488259, "end": 2489330}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/discussion_impostor.n.png", "start": 2489330, "end": 2490401}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/discussion_impostor.ne.png", "start": 2490401, "end": 2491472}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/discussion_impostor.nw.png", "start": 2491472, "end": 2492530}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/discussion_impostor.s.png", "start": 2492530, "end": 2493601}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/discussion_impostor.se.png", "start": 2493601, "end": 2494672}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/discussion_impostor.sw.png", "start": 2494672, "end": 2495730}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/discussion_impostor.w.png", "start": 2495730, "end": 2496788}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/ejected_crewmate.e.png", "start": 2496788, "end": 2498125}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/ejected_crewmate.n.png", "start": 2498125, "end": 2499462}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/ejected_crewmate.ne.png", "start": 2499462, "end": 2500799}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/ejected_crewmate.nw.png", "start": 2500799, "end": 2502173}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/ejected_crewmate.s.png", "start": 2502173, "end": 2503510}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/ejected_crewmate.se.png", "start": 2503510, "end": 2504847}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/ejected_crewmate.sw.png", "start": 2504847, "end": 2506221}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/ejected_crewmate.w.png", "start": 2506221, "end": 2507595}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/ejected_impostor.e.png", "start": 2507595, "end": 2508946}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/ejected_impostor.n.png", "start": 2508946, "end": 2510297}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/ejected_impostor.ne.png", "start": 2510297, "end": 2511648}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/ejected_impostor.nw.png", "start": 2511648, "end": 2513018}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/ejected_impostor.s.png", "start": 2513018, "end": 2514369}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/ejected_impostor.se.png", "start": 2514369, "end": 2515720}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/ejected_impostor.sw.png", "start": 2515720, "end": 2517090}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/ejected_impostor.w.png", "start": 2517090, "end": 2518460}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/impostor.e.png", "start": 2518460, "end": 2519163}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/impostor.n.png", "start": 2519163, "end": 2519866}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/impostor.ne.png", "start": 2519866, "end": 2520569}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/impostor.nw.png", "start": 2520569, "end": 2521260}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/impostor.s.png", "start": 2521260, "end": 2521963}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/impostor.se.png", "start": 2521963, "end": 2522666}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/impostor.sw.png", "start": 2522666, "end": 2523357}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/impostor.w.png", "start": 2523357, "end": 2524048}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/vote_impostor_crewmate.e.png", "start": 2524048, "end": 2525275}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/vote_impostor_crewmate.n.png", "start": 2525275, "end": 2526502}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/vote_impostor_crewmate.ne.png", "start": 2526502, "end": 2527729}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/vote_impostor_crewmate.nw.png", "start": 2527729, "end": 2528949}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/vote_impostor_crewmate.s.png", "start": 2528949, "end": 2530176}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/vote_impostor_crewmate.se.png", "start": 2530176, "end": 2531403}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/vote_impostor_crewmate.sw.png", "start": 2531403, "end": 2532623}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/vote_impostor_crewmate.w.png", "start": 2532623, "end": 2533843}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/vote_impostor_impostor.e.png", "start": 2533843, "end": 2535070}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/vote_impostor_impostor.n.png", "start": 2535070, "end": 2536297}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/vote_impostor_impostor.ne.png", "start": 2536297, "end": 2537524}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/vote_impostor_impostor.nw.png", "start": 2537524, "end": 2538748}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/vote_impostor_impostor.s.png", "start": 2538748, "end": 2539975}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/vote_impostor_impostor.se.png", "start": 2539975, "end": 2541202}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/vote_impostor_impostor.sw.png", "start": 2541202, "end": 2542426}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/vote_impostor_impostor.w.png", "start": 2542426, "end": 2543650}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/vote_skip_crewmate.e.png", "start": 2543650, "end": 2544691}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/vote_skip_crewmate.n.png", "start": 2544691, "end": 2545732}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/vote_skip_crewmate.ne.png", "start": 2545732, "end": 2546773}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/vote_skip_crewmate.nw.png", "start": 2546773, "end": 2547811}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/vote_skip_crewmate.s.png", "start": 2547811, "end": 2548852}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/vote_skip_crewmate.se.png", "start": 2548852, "end": 2549893}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/vote_skip_crewmate.sw.png", "start": 2549893, "end": 2550931}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/vote_skip_crewmate.w.png", "start": 2550931, "end": 2551969}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/vote_skip_impostor.e.png", "start": 2551969, "end": 2553012}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/vote_skip_impostor.n.png", "start": 2553012, "end": 2554055}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/vote_skip_impostor.ne.png", "start": 2554055, "end": 2555098}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/vote_skip_impostor.nw.png", "start": 2555098, "end": 2556126}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/vote_skip_impostor.s.png", "start": 2556126, "end": 2557169}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/vote_skip_impostor.se.png", "start": 2557169, "end": 2558212}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/vote_skip_impostor.sw.png", "start": 2558212, "end": 2559240}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/agents/vote_skip_impostor.w.png", "start": 2559240, "end": 2560268}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/admin_station.png", "start": 2560268, "end": 2560688}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/admin_vent.png", "start": 2560688, "end": 2561039}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/among_us_admin_station.png", "start": 2561039, "end": 2561459}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/among_us_comms_station.png", "start": 2561459, "end": 2561863}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/among_us_crew_station.png", "start": 2561863, "end": 2563568}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/among_us_emergency_button.png", "start": 2563568, "end": 2563987}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/among_us_impostor_station.png", "start": 2563987, "end": 2565658}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/among_us_lights_station.png", "start": 2565658, "end": 2566098}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/among_us_medbay_station.png", "start": 2566098, "end": 2566485}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/among_us_navigation_station.png", "start": 2566485, "end": 2568372}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/among_us_oxygen_station.png", "start": 2568372, "end": 2570399}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/among_us_reactor_station.png", "start": 2570399, "end": 2572208}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/among_us_security_station.png", "start": 2572208, "end": 2572637}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/among_us_shields_station.png", "start": 2572637, "end": 2573044}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/among_us_weapons_station.png", "start": 2573044, "end": 2573501}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/among_us_wiring_station.png", "start": 2573501, "end": 2574984}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/ballot_crewmate.png", "start": 2574984, "end": 2575361}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/ballot_impostor.png", "start": 2575361, "end": 2575733}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/body_crewmate.png", "start": 2575733, "end": 2576175}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/body_impostor.png", "start": 2576175, "end": 2576620}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/cafeteria_vent.png", "start": 2576620, "end": 2576971}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/comms_station.png", "start": 2576971, "end": 2577375}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/crew_station.png", "start": 2577375, "end": 2579080}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/crewmate.png", "start": 2579080, "end": 2579349}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/discussion_crewmate.png", "start": 2579349, "end": 2579723}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/discussion_impostor.png", "start": 2579723, "end": 2580106}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/ejected_crewmate.png", "start": 2580106, "end": 2580546}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/ejected_impostor.png", "start": 2580546, "end": 2580994}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/electrical_vent.png", "start": 2580994, "end": 2581345}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/emergency_button.png", "start": 2581345, "end": 2581764}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/impostor.png", "start": 2581764, "end": 2582056}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/impostor_station.png", "start": 2582056, "end": 2583727}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/lights_station.png", "start": 2583727, "end": 2584167}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/lower_engine_vent.png", "start": 2584167, "end": 2584518}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/medbay_station.png", "start": 2584518, "end": 2584905}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/medbay_vent.png", "start": 2584905, "end": 2585256}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/navigation_station.png", "start": 2585256, "end": 2587143}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/navigation_vent.png", "start": 2587143, "end": 2587494}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/oxygen_station.png", "start": 2587494, "end": 2589521}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/oxygen_vent.png", "start": 2589521, "end": 2589872}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/reactor_station.png", "start": 2589872, "end": 2591681}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/reactor_vent.png", "start": 2591681, "end": 2592032}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/security_station.png", "start": 2592032, "end": 2592461}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/security_vent.png", "start": 2592461, "end": 2592812}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/shields_station.png", "start": 2592812, "end": 2593219}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/shields_vent.png", "start": 2593219, "end": 2593570}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/upper_engine_vent.png", "start": 2593570, "end": 2593921}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/vent.png", "start": 2593921, "end": 2594272}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/vote_impostor_crewmate.png", "start": 2594272, "end": 2594647}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/vote_impostor_impostor.png", "start": 2594647, "end": 2595021}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/vote_skip_crewmate.png", "start": 2595021, "end": 2595381}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/vote_skip_impostor.png", "start": 2595381, "end": 2595752}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/weapons_station.png", "start": 2595752, "end": 2596209}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/weapons_vent.png", "start": 2596209, "end": 2596560}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/minimap/wiring_station.png", "start": 2596560, "end": 2598043}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/objects/admin_station.png", "start": 2598043, "end": 2598634}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/objects/admin_vent.png", "start": 2598634, "end": 2599435}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/objects/among_us_admin_station.png", "start": 2599435, "end": 2600026}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/objects/among_us_comms_station.png", "start": 2600026, "end": 2600586}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/objects/among_us_crew_station.png", "start": 2600586, "end": 2606862}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/objects/among_us_emergency_button.png", "start": 2606862, "end": 2607463}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/objects/among_us_impostor_station.png", "start": 2607463, "end": 2613497}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/objects/among_us_lights_station.png", "start": 2613497, "end": 2614097}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/objects/among_us_medbay_station.png", "start": 2614097, "end": 2614646}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/objects/among_us_navigation_station.png", "start": 2614646, "end": 2620114}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/objects/among_us_oxygen_station.png", "start": 2620114, "end": 2627803}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/objects/among_us_reactor_station.png", "start": 2627803, "end": 2634550}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/objects/among_us_security_station.png", "start": 2634550, "end": 2635133}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/objects/among_us_shields_station.png", "start": 2635133, "end": 2635710}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/objects/among_us_weapons_station.png", "start": 2635710, "end": 2636323}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/objects/among_us_wiring_station.png", "start": 2636323, "end": 2642160}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/objects/cafeteria_vent.png", "start": 2642160, "end": 2642961}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/objects/comms_station.png", "start": 2642961, "end": 2643521}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/objects/crew_station.png", "start": 2643521, "end": 2649797}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/objects/electrical_vent.png", "start": 2649797, "end": 2650598}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/objects/emergency_button.png", "start": 2650598, "end": 2651199}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/objects/impostor_station.png", "start": 2651199, "end": 2657233}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/objects/lights_station.png", "start": 2657233, "end": 2657833}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/objects/lower_engine_vent.png", "start": 2657833, "end": 2658634}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/objects/medbay_station.png", "start": 2658634, "end": 2659183}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/objects/medbay_vent.png", "start": 2659183, "end": 2659984}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/objects/navigation_station.png", "start": 2659984, "end": 2665452}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/objects/navigation_vent.png", "start": 2665452, "end": 2666253}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/objects/oxygen_station.png", "start": 2666253, "end": 2673942}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/objects/oxygen_vent.png", "start": 2673942, "end": 2674743}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/objects/reactor_station.png", "start": 2674743, "end": 2681490}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/objects/reactor_vent.png", "start": 2681490, "end": 2682291}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/objects/security_station.png", "start": 2682291, "end": 2682874}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/objects/security_vent.png", "start": 2682874, "end": 2683675}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/objects/shields_station.png", "start": 2683675, "end": 2684252}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/objects/shields_vent.png", "start": 2684252, "end": 2685053}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/objects/upper_engine_vent.png", "start": 2685053, "end": 2685854}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/objects/vent.png", "start": 2685854, "end": 2686655}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/objects/weapons_station.png", "start": 2686655, "end": 2687268}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/objects/weapons_vent.png", "start": 2687268, "end": 2688069}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/objects/wiring_station.png", "start": 2688069, "end": 2693906}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/admin_station.png", "start": 2693906, "end": 2695590}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/admin_vent.png", "start": 2695590, "end": 2697568}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/among_us_admin_station.png", "start": 2697568, "end": 2699252}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/among_us_comms_station.png", "start": 2699252, "end": 2700927}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/among_us_crew_station.png", "start": 2700927, "end": 2709221}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/among_us_emergency_button.png", "start": 2709221, "end": 2710874}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/among_us_impostor_station.png", "start": 2710874, "end": 2719018}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/among_us_lights_station.png", "start": 2719018, "end": 2720671}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/among_us_medbay_station.png", "start": 2720671, "end": 2722282}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/among_us_navigation_station.png", "start": 2722282, "end": 2730113}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/among_us_oxygen_station.png", "start": 2730113, "end": 2740004}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/among_us_reactor_station.png", "start": 2740004, "end": 2748746}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/among_us_security_station.png", "start": 2748746, "end": 2750370}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/among_us_shields_station.png", "start": 2750370, "end": 2752015}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/among_us_weapons_station.png", "start": 2752015, "end": 2753710}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/among_us_wiring_station.png", "start": 2753710, "end": 2761444}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/ballot_crewmate.png", "start": 2761444, "end": 2762710}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/ballot_impostor.png", "start": 2762710, "end": 2764068}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/body_crewmate.png", "start": 2764068, "end": 2765202}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/body_impostor.png", "start": 2765202, "end": 2766607}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/cafeteria_vent.png", "start": 2766607, "end": 2768585}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/comms_station.png", "start": 2768585, "end": 2770260}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/crew_station.png", "start": 2770260, "end": 2778554}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/crewmate.png", "start": 2778554, "end": 2779549}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/discussion_crewmate.png", "start": 2779549, "end": 2780761}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/discussion_impostor.png", "start": 2780761, "end": 2782072}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/ejected_crewmate.png", "start": 2782072, "end": 2783556}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/ejected_impostor.png", "start": 2783556, "end": 2785254}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/electrical_vent.png", "start": 2785254, "end": 2787232}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/emergency_button.png", "start": 2787232, "end": 2788885}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/impostor.png", "start": 2788885, "end": 2790128}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/impostor_station.png", "start": 2790128, "end": 2798272}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/lights_station.png", "start": 2798272, "end": 2799925}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/lower_engine_vent.png", "start": 2799925, "end": 2801903}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/medbay_station.png", "start": 2801903, "end": 2803514}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/medbay_vent.png", "start": 2803514, "end": 2805492}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/navigation_station.png", "start": 2805492, "end": 2813323}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/navigation_vent.png", "start": 2813323, "end": 2815301}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/oxygen_station.png", "start": 2815301, "end": 2825192}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/oxygen_vent.png", "start": 2825192, "end": 2827170}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/reactor_station.png", "start": 2827170, "end": 2835912}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/reactor_vent.png", "start": 2835912, "end": 2837890}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/security_station.png", "start": 2837890, "end": 2839514}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/security_vent.png", "start": 2839514, "end": 2841492}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/shields_station.png", "start": 2841492, "end": 2843137}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/shields_vent.png", "start": 2843137, "end": 2845115}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/upper_engine_vent.png", "start": 2845115, "end": 2847093}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/vent.png", "start": 2847093, "end": 2849071}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/vote_impostor_crewmate.png", "start": 2849071, "end": 2850387}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/vote_impostor_impostor.png", "start": 2850387, "end": 2851808}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/vote_skip_crewmate.png", "start": 2851808, "end": 2852991}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/vote_skip_impostor.png", "start": 2852991, "end": 2854268}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/weapons_station.png", "start": 2854268, "end": 2855963}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/weapons_vent.png", "start": 2855963, "end": 2857941}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/profiles/wiring_station.png", "start": 2857941, "end": 2865675}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/terrain/repeating.among_us.png", "start": 2865675, "end": 2952448}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/terrain/stamp.among_us_admin.png", "start": 2952448, "end": 2954768}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/terrain/stamp.among_us_comms.png", "start": 2954768, "end": 2957577}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/terrain/stamp.among_us_crew.png", "start": 2957577, "end": 3021443}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/terrain/stamp.among_us_emergency.png", "start": 3021443, "end": 3024230}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/terrain/stamp.among_us_impostor.png", "start": 3024230, "end": 3081803}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/terrain/stamp.among_us_lights.png", "start": 3081803, "end": 3084471}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/terrain/stamp.among_us_medbay.png", "start": 3084471, "end": 3086825}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/terrain/stamp.among_us_navigation.png", "start": 3086825, "end": 3162228}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/terrain/stamp.among_us_oxygen.png", "start": 3162228, "end": 3228044}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/terrain/stamp.among_us_reactor.png", "start": 3228044, "end": 3303602}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/terrain/stamp.among_us_security.png", "start": 3303602, "end": 3306328}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/terrain/stamp.among_us_shields.png", "start": 3306328, "end": 3309233}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/terrain/stamp.among_us_vent.png", "start": 3309233, "end": 3311362}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/terrain/stamp.among_us_weapons.png", "start": 3311362, "end": 3314310}, {"filename": "/packages/mettagrid/nim/mettascope/data/amongus/terrain/stamp.among_us_wiring.png", "start": 3314310, "end": 3376794}, {"filename": "/packages/mettagrid/nim/mettascope/data/aoe7x8.png", "start": 3376794, "end": 3442492}, {"filename": "/packages/mettagrid/nim/mettascope/data/blob7x8.png", "start": 3442492, "end": 3476275}, {"filename": "/packages/mettagrid/nim/mettascope/data/cog_names.txt", "start": 3476275, "end": 3477304}, {"filename": "/packages/mettagrid/nim/mettascope/data/crosshair.png", "start": 3477304, "end": 3478031}, {"filename": "/packages/mettagrid/nim/mettascope/data/dash.png", "start": 3478031, "end": 3478271}, {"filename": "/packages/mettagrid/nim/mettascope/data/effects/halo.png", "start": 3478271, "end": 3502501}, {"filename": "/packages/mettagrid/nim/mettascope/data/fidget/fonts/IBMPlexMono-Regular.ttf", "start": 3502501, "end": 3636221}, {"filename": "/packages/mettagrid/nim/mettascope/data/fidget/fonts/IBMPlexSans-Bold.ttf", "start": 3636221, "end": 3822725}, {"filename": "/packages/mettagrid/nim/mettascope/data/fidget/fonts/IBMPlexSans-Regular.ttf", "start": 3822725, "end": 4009085}, {"filename": "/packages/mettagrid/nim/mettascope/data/fidget/fonts/NotoSansJP-Regular.ttf", "start": 4009085, "end": 8681877}, {"filename": "/packages/mettagrid/nim/mettascope/data/fidget/fonts/jsMath-cmbx10.ttf", "start": 8681877, "end": 8733737}, {"filename": "/packages/mettagrid/nim/mettascope/data/fidget/hHmLTy7slXTOej6opPqWpz.json", "start": 8733737, "end": 10779583}, {"filename": "/packages/mettagrid/nim/mettascope/data/fidget/hHmLTy7slXTOej6opPqWpz.json.snappy", "start": 10779583, "end": 10993101}, {"filename": "/packages/mettagrid/nim/mettascope/data/fidget/hHmLTy7slXTOej6opPqWpz.lastModified", "start": 10993101, "end": 10993121}, {"filename": "/packages/mettagrid/nim/mettascope/data/fidget/images/05bab347bacaede7606b8e59426dc42b155a8fd6.png", "start": 10993121, "end": 12219932}, {"filename": "/packages/mettagrid/nim/mettascope/data/fidget/images/11f0598c7a572fe7461bc54b07423b7b5e3e7a60.png", "start": 12219932, "end": 13927584}, {"filename": "/packages/mettagrid/nim/mettascope/data/fidget/images/2d993430f151c64eae41bc886ec16271d2feab6c.png", "start": 13927584, "end": 13929755}, {"filename": "/packages/mettagrid/nim/mettascope/data/fidget/images/42480bc49710a5f0ebfafe1e1a7785068db37106.png", "start": 13929755, "end": 13931554}, {"filename": "/packages/mettagrid/nim/mettascope/data/fidget/images/621976c3803ef1eea0c316c0e86e1bc31bd6dba4.png", "start": 13931554, "end": 13932414}, {"filename": "/packages/mettagrid/nim/mettascope/data/fidget/images/79d04b14381789498b35cbd1ae05eb578ededb5f.png", "start": 13932414, "end": 13939201}, {"filename": "/packages/mettagrid/nim/mettascope/data/fidget/images/7b2b3374ea1a80648e8c68a472dcbba188af3e8e.png", "start": 13939201, "end": 15018789}, {"filename": "/packages/mettagrid/nim/mettascope/data/fidget/images/86e7f3e8b46af021592fa055ecb606c6b0825c12.png", "start": 15018789, "end": 16131726}, {"filename": "/packages/mettagrid/nim/mettascope/data/fidget/images/ac4765273b78fb68ac1e913e54c54224b7f6f215.png", "start": 16131726, "end": 17222578}, {"filename": "/packages/mettagrid/nim/mettascope/data/fidget/images/b765480fbb089bf76a68424612eeb48ddd95ccc7.png", "start": 17222578, "end": 17226025}, {"filename": "/packages/mettagrid/nim/mettascope/data/fidget/images/eb9f0db464f0f04a52566cd211a561f76d1bcc2a.png", "start": 17226025, "end": 17233613}, {"filename": "/packages/mettagrid/nim/mettascope/data/fidget/images/f10e39779ee551c9d46a527d2ea2a67f434f2867.png", "start": 17233613, "end": 17284202}, {"filename": "/packages/mettagrid/nim/mettascope/data/fog7x8.png", "start": 17284202, "end": 17293170}, {"filename": "/packages/mettagrid/nim/mettascope/data/fonts/Inter-Regular.ttf", "start": 17293170, "end": 17635850}, {"filename": "/packages/mettagrid/nim/mettascope/data/fonts/pf_tempesta_five_compressed.ttf", "start": 17635850, "end": 17703126}, {"filename": "/packages/mettagrid/nim/mettascope/data/icons/agents/agent.png", "start": 17703126, "end": 17707688}, {"filename": "/packages/mettagrid/nim/mettascope/data/icons/agents/aligner.png", "start": 17707688, "end": 17712827}, {"filename": "/packages/mettagrid/nim/mettascope/data/icons/agents/miner.png", "start": 17712827, "end": 17718194}, {"filename": "/packages/mettagrid/nim/mettascope/data/icons/agents/scout.png", "start": 17718194, "end": 17723217}, {"filename": "/packages/mettagrid/nim/mettascope/data/icons/agents/scrambler.png", "start": 17723217, "end": 17728349}, {"filename": "/packages/mettagrid/nim/mettascope/data/icons/hp.png", "start": 17728349, "end": 17730034}, {"filename": "/packages/mettagrid/nim/mettascope/data/icons/influence.png", "start": 17730034, "end": 17731948}, {"filename": "/packages/mettagrid/nim/mettascope/data/icons/objects/aligner.png", "start": 17731948, "end": 17737761}, {"filename": "/packages/mettagrid/nim/mettascope/data/icons/objects/carbon_extractor.png", "start": 17737761, "end": 17745652}, {"filename": "/packages/mettagrid/nim/mettascope/data/icons/objects/chest.png", "start": 17745652, "end": 17750836}, {"filename": "/packages/mettagrid/nim/mettascope/data/icons/objects/chopping.png", "start": 17750836, "end": 17755247}, {"filename": "/packages/mettagrid/nim/mettascope/data/icons/objects/cooking.png", "start": 17755247, "end": 17759824}, {"filename": "/packages/mettagrid/nim/mettascope/data/icons/objects/fryer.png", "start": 17759824, "end": 17764582}, {"filename": "/packages/mettagrid/nim/mettascope/data/icons/objects/germanium_extractor.png", "start": 17764582, "end": 17772034}, {"filename": "/packages/mettagrid/nim/mettascope/data/icons/objects/hub.png", "start": 17772034, "end": 17779486}, {"filename": "/packages/mettagrid/nim/mettascope/data/icons/objects/junction.png", "start": 17779486, "end": 17787068}, {"filename": "/packages/mettagrid/nim/mettascope/data/icons/objects/meat.png", "start": 17787068, "end": 17791829}, {"filename": "/packages/mettagrid/nim/mettascope/data/icons/objects/miner.png", "start": 17791829, "end": 17798050}, {"filename": "/packages/mettagrid/nim/mettascope/data/icons/objects/order_board.png", "start": 17798050, "end": 17800332}, {"filename": "/packages/mettagrid/nim/mettascope/data/icons/objects/oxygen_extractor.png", "start": 17800332, "end": 17806926}, {"filename": "/packages/mettagrid/nim/mettascope/data/icons/objects/plate.png", "start": 17806926, "end": 17811595}, {"filename": "/packages/mettagrid/nim/mettascope/data/icons/objects/scout.png", "start": 17811595, "end": 17817551}, {"filename": "/packages/mettagrid/nim/mettascope/data/icons/objects/scrambler.png", "start": 17817551, "end": 17824376}, {"filename": "/packages/mettagrid/nim/mettascope/data/icons/objects/serving.png", "start": 17824376, "end": 17828496}, {"filename": "/packages/mettagrid/nim/mettascope/data/icons/objects/silicon_extractor.png", "start": 17828496, "end": 17836073}, {"filename": "/packages/mettagrid/nim/mettascope/data/icons/objects/veg.png", "start": 17836073, "end": 17840926}, {"filename": "/packages/mettagrid/nim/mettascope/data/icons/objects/wash.png", "start": 17840926, "end": 17845151}, {"filename": "/packages/mettagrid/nim/mettascope/data/icons/reboot.png", "start": 17845151, "end": 17855053}, {"filename": "/packages/mettagrid/nim/mettascope/data/icons/scrambled.png", "start": 17855053, "end": 17861441}, {"filename": "/packages/mettagrid/nim/mettascope/data/icons/solar.png", "start": 17861441, "end": 17863802}, {"filename": "/packages/mettagrid/nim/mettascope/data/icons/undefined.png", "start": 17863802, "end": 17865693}, {"filename": "/packages/mettagrid/nim/mettascope/data/info.png", "start": 17865693, "end": 17868342}, {"filename": "/packages/mettagrid/nim/mettascope/data/meta_grid_icon.png", "start": 17868342, "end": 17878950}, {"filename": "/packages/mettagrid/nim/mettascope/data/minimap/agent.png", "start": 17878950, "end": 17879427}, {"filename": "/packages/mettagrid/nim/mettascope/data/minimap/aligner.png", "start": 17879427, "end": 17879605}, {"filename": "/packages/mettagrid/nim/mettascope/data/minimap/aligner_station.png", "start": 17879605, "end": 17879783}, {"filename": "/packages/mettagrid/nim/mettascope/data/minimap/carbon_extractor.png", "start": 17879783, "end": 17880413}, {"filename": "/packages/mettagrid/nim/mettascope/data/minimap/charger.png", "start": 17880413, "end": 17881202}, {"filename": "/packages/mettagrid/nim/mettascope/data/minimap/chest.png", "start": 17881202, "end": 17881397}, {"filename": "/packages/mettagrid/nim/mettascope/data/minimap/dot.png", "start": 17881397, "end": 17881694}, {"filename": "/packages/mettagrid/nim/mettascope/data/minimap/germanium_extractor.png", "start": 17881694, "end": 17882742}, {"filename": "/packages/mettagrid/nim/mettascope/data/minimap/hub.png", "start": 17882742, "end": 17883019}, {"filename": "/packages/mettagrid/nim/mettascope/data/minimap/junction.png", "start": 17883019, "end": 17883307}, {"filename": "/packages/mettagrid/nim/mettascope/data/minimap/miner.png", "start": 17883307, "end": 17883511}, {"filename": "/packages/mettagrid/nim/mettascope/data/minimap/miner_station.png", "start": 17883511, "end": 17883715}, {"filename": "/packages/mettagrid/nim/mettascope/data/minimap/overcooked_chopping_station.png", "start": 17883715, "end": 17885407}, {"filename": "/packages/mettagrid/nim/mettascope/data/minimap/overcooked_cooking_burned.png", "start": 17885407, "end": 17887038}, {"filename": "/packages/mettagrid/nim/mettascope/data/minimap/overcooked_cooking_ready.png", "start": 17887038, "end": 17888579}, {"filename": "/packages/mettagrid/nim/mettascope/data/minimap/overcooked_cooking_station.png", "start": 17888579, "end": 17890309}, {"filename": "/packages/mettagrid/nim/mettascope/data/minimap/overcooked_fryer_burned.png", "start": 17890309, "end": 17891927}, {"filename": "/packages/mettagrid/nim/mettascope/data/minimap/overcooked_fryer_ready.png", "start": 17891927, "end": 17893784}, {"filename": "/packages/mettagrid/nim/mettascope/data/minimap/overcooked_fryer_station.png", "start": 17893784, "end": 17895560}, {"filename": "/packages/mettagrid/nim/mettascope/data/minimap/overcooked_meat_station.png", "start": 17895560, "end": 17897288}, {"filename": "/packages/mettagrid/nim/mettascope/data/minimap/overcooked_order_board.png", "start": 17897288, "end": 17898257}, {"filename": "/packages/mettagrid/nim/mettascope/data/minimap/overcooked_plate_station.png", "start": 17898257, "end": 17900044}, {"filename": "/packages/mettagrid/nim/mettascope/data/minimap/overcooked_serving_station.png", "start": 17900044, "end": 17901643}, {"filename": "/packages/mettagrid/nim/mettascope/data/minimap/overcooked_veg_station.png", "start": 17901643, "end": 17903400}, {"filename": "/packages/mettagrid/nim/mettascope/data/minimap/overcooked_wash_station.png", "start": 17903400, "end": 17904961}, {"filename": "/packages/mettagrid/nim/mettascope/data/minimap/oxygen_extractor.png", "start": 17904961, "end": 17905806}, {"filename": "/packages/mettagrid/nim/mettascope/data/minimap/scout.png", "start": 17905806, "end": 17906008}, {"filename": "/packages/mettagrid/nim/mettascope/data/minimap/scout_station.png", "start": 17906008, "end": 17906210}, {"filename": "/packages/mettagrid/nim/mettascope/data/minimap/scrambler.png", "start": 17906210, "end": 17906417}, {"filename": "/packages/mettagrid/nim/mettascope/data/minimap/scrambler_station.png", "start": 17906417, "end": 17906624}, {"filename": "/packages/mettagrid/nim/mettascope/data/minimap/selection.png", "start": 17906624, "end": 17907530}, {"filename": "/packages/mettagrid/nim/mettascope/data/minimap/silicon_extractor.png", "start": 17907530, "end": 17908481}, {"filename": "/packages/mettagrid/nim/mettascope/data/minimap/unknown.png", "start": 17908481, "end": 17908678}, {"filename": "/packages/mettagrid/nim/mettascope/data/minimapPip.png", "start": 17908678, "end": 17908900}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/agent.png", "start": 17908900, "end": 17910456}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/aligner.mask.png", "start": 17910456, "end": 17918697}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/aligner.png", "start": 17918697, "end": 17969521}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/altar.png", "start": 17969521, "end": 17972986}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/aoe_overlay.png", "start": 17972986, "end": 17973379}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/aoe_overlay_grey.png", "start": 17973379, "end": 17973770}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/aoe_overlay_red.png", "start": 17973770, "end": 17974163}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/armory.png", "start": 17974163, "end": 17980507}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/assembler.lamp.png", "start": 17980507, "end": 17998438}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/battery_station.png", "start": 17998438, "end": 18014108}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/block.png", "start": 18014108, "end": 18017786}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/carbon_ex_dep.png", "start": 18017786, "end": 18026813}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/carbon_extractor.clipped.png", "start": 18026813, "end": 18037686}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/carbon_extractor.clipped2.png", "start": 18037686, "end": 18049593}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/carbon_extractor.clipped3.png", "start": 18049593, "end": 18057093}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/carbon_extractor.depleted.l1.png", "start": 18057093, "end": 18069581}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/carbon_extractor.depleted.l10.png", "start": 18069581, "end": 18126465}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/carbon_extractor.depleted.l2.png", "start": 18126465, "end": 18143634}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/carbon_extractor.depleted.l3.png", "start": 18143634, "end": 18166102}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/carbon_extractor.depleted.l4.png", "start": 18166102, "end": 18194314}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/carbon_extractor.depleted.l5.png", "start": 18194314, "end": 18229470}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/carbon_extractor.depleted.l6.png", "start": 18229470, "end": 18271484}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/carbon_extractor.depleted.l7.png", "start": 18271484, "end": 18320696}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/carbon_extractor.depleted.l8.png", "start": 18320696, "end": 18377580}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/carbon_extractor.depleted.l9.png", "start": 18377580, "end": 18434464}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/carbon_extractor.depleted.png", "start": 18434464, "end": 18469117}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/carbon_extractor.full.png", "start": 18469117, "end": 18476873}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/carbon_extractor.l1.png", "start": 18476873, "end": 18489530}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/carbon_extractor.l10.png", "start": 18489530, "end": 18545730}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/carbon_extractor.l2.png", "start": 18545730, "end": 18562970}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/carbon_extractor.l3.png", "start": 18562970, "end": 18585497}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/carbon_extractor.l4.png", "start": 18585497, "end": 18613874}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/carbon_extractor.l5.png", "start": 18613874, "end": 18648762}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/carbon_extractor.l6.png", "start": 18648762, "end": 18690558}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/carbon_extractor.l7.png", "start": 18690558, "end": 18740209}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/carbon_extractor.l8.png", "start": 18740209, "end": 18796409}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/carbon_extractor.l9.png", "start": 18796409, "end": 18852609}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/carbon_extractor.lamp.png", "start": 18852609, "end": 18857574}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/carbon_extractor.png", "start": 18857574, "end": 18915150}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/carbon_extractor.remnant.png", "start": 18915150, "end": 18942150}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/carbon_extractor.working.png", "start": 18942150, "end": 18977057}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/cargo_station.png", "start": 18977057, "end": 19023634}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/charger-1.png", "start": 19023634, "end": 19026241}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/charger.clipped.png", "start": 19026241, "end": 19037656}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/charger.png", "start": 19037656, "end": 19061369}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/charger_ex_dep.png", "start": 19061369, "end": 19064103}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/chef.mask.png", "start": 19064103, "end": 19073157}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/chef.png", "start": 19073157, "end": 19132838}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/chest.lamp.png", "start": 19132838, "end": 19148833}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/chest.png", "start": 19148833, "end": 19162458}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/chest_carbon.png", "start": 19162458, "end": 19165730}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/chest_germanium.png", "start": 19165730, "end": 19169594}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/chest_oxygen.png", "start": 19169594, "end": 19173328}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/chest_silicon.png", "start": 19173328, "end": 19177069}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/converter.png", "start": 19177069, "end": 19183845}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/core_a_station.png", "start": 19183845, "end": 19210524}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/core_d_station.png", "start": 19210524, "end": 19265974}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/core_station.png", "start": 19265974, "end": 19298703}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/datacenter.png", "start": 19298703, "end": 19395541}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/datacenter.working.png", "start": 19395541, "end": 19492379}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/dogma_station.png", "start": 19492379, "end": 19514041}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/drill_station.png", "start": 19514041, "end": 19537872}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/factory.png", "start": 19537872, "end": 19545127}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/firewall_station.png", "start": 19545127, "end": 19572298}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/frog.png", "start": 19572298, "end": 19578555}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/gen_a_station.png", "start": 19578555, "end": 19610625}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/gen_d_station.png", "start": 19610625, "end": 19650813}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/generator.lamp.png", "start": 19650813, "end": 19657885}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/generator.png", "start": 19657885, "end": 19662611}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/generator_blue.png", "start": 19662611, "end": 19667463}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/generator_green.png", "start": 19667463, "end": 19672257}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/generator_red.png", "start": 19672257, "end": 19677073}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/germanium_ex_dep.png", "start": 19677073, "end": 19685234}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/germanium_extractor.clipped.png", "start": 19685234, "end": 19695445}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/germanium_extractor.clipped2.png", "start": 19695445, "end": 19706440}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/germanium_extractor.clipped3.png", "start": 19706440, "end": 19713880}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/germanium_extractor.depleted.l1.png", "start": 19713880, "end": 19725433}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/germanium_extractor.depleted.l10.png", "start": 19725433, "end": 19779073}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/germanium_extractor.depleted.l2.png", "start": 19779073, "end": 19794897}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/germanium_extractor.depleted.l3.png", "start": 19794897, "end": 19815709}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/germanium_extractor.depleted.l4.png", "start": 19815709, "end": 19842052}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/germanium_extractor.depleted.l5.png", "start": 19842052, "end": 19874750}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/germanium_extractor.depleted.l6.png", "start": 19874750, "end": 19913806}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/germanium_extractor.depleted.l7.png", "start": 19913806, "end": 19960046}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/germanium_extractor.depleted.l8.png", "start": 19960046, "end": 20013686}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/germanium_extractor.depleted.l9.png", "start": 20013686, "end": 20067326}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/germanium_extractor.depleted.png", "start": 20067326, "end": 20099661}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/germanium_extractor.l1.png", "start": 20099661, "end": 20111473}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/germanium_extractor.l10.png", "start": 20111473, "end": 20164603}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/germanium_extractor.l2.png", "start": 20164603, "end": 20180739}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/germanium_extractor.l3.png", "start": 20180739, "end": 20201869}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/germanium_extractor.l4.png", "start": 20201869, "end": 20228612}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/germanium_extractor.l5.png", "start": 20228612, "end": 20261508}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/germanium_extractor.l6.png", "start": 20261508, "end": 20301374}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/germanium_extractor.l7.png", "start": 20301374, "end": 20348484}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/germanium_extractor.l8.png", "start": 20348484, "end": 20401614}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/germanium_extractor.l9.png", "start": 20401614, "end": 20454744}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/germanium_extractor.lamp.png", "start": 20454744, "end": 20459049}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/germanium_extractor.png", "start": 20459049, "end": 20513817}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/germanium_extractor.remnant.png", "start": 20513817, "end": 20539958}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/germanium_extractor.working.png", "start": 20539958, "end": 20572386}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/heart_station.png", "start": 20572386, "end": 20621529}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/hub.green.4.png", "start": 20621529, "end": 20695819}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/hub.png", "start": 20695819, "end": 20770460}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/hub.ready.png", "start": 20770460, "end": 20846310}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/hub.red.1.green.3.png", "start": 20846310, "end": 20920490}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/hub.red.1.png", "start": 20920490, "end": 20993937}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/hub.red.2.green.2.png", "start": 20993937, "end": 21068095}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/hub.red.2.png", "start": 21068095, "end": 21141689}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/hub.red.3.green.1.png", "start": 21141689, "end": 21215833}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/hub.working.png", "start": 21215833, "end": 21292034}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/insulator_station.png", "start": 21292034, "end": 21316577}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/junction.clipped1.png", "start": 21316577, "end": 21400235}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/junction.clipped2.png", "start": 21400235, "end": 21486199}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/junction.clipped3.png", "start": 21486199, "end": 21573821}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/junction.depleted.png", "start": 21573821, "end": 21644096}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/junction.lamp.png", "start": 21644096, "end": 21658395}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/junction.png", "start": 21658395, "end": 21728048}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/junction.working.png", "start": 21728048, "end": 21798445}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/lab.png", "start": 21798445, "end": 21805026}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/lance_station.png", "start": 21805026, "end": 21827473}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/lasery.png", "start": 21827473, "end": 21833994}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/market_station.png", "start": 21833994, "end": 21902005}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/meme_station.png", "start": 21902005, "end": 21924525}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/mine.png", "start": 21924525, "end": 21928686}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/mine_blue.png", "start": 21928686, "end": 21932909}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/mine_green.png", "start": 21932909, "end": 21937085}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/mine_red.png", "start": 21937085, "end": 21941293}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/miner.mask.png", "start": 21941293, "end": 21955375}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/miner.png", "start": 21955375, "end": 22014130}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/miner_pickaxe.mask.png", "start": 22014130, "end": 22022717}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/miner_pickaxe.png", "start": 22022717, "end": 22082794}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/observatory.png", "start": 22082794, "end": 22156866}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/observatory.working.png", "start": 22156866, "end": 22230938}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/os_a_station.png", "start": 22230938, "end": 22262588}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/os_d_station.png", "start": 22262588, "end": 22305553}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/overcooked_chopping_station.png", "start": 22305553, "end": 22330230}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/overcooked_cooking_burned.png", "start": 22330230, "end": 22352298}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/overcooked_cooking_ready.png", "start": 22352298, "end": 22372076}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/overcooked_cooking_station.png", "start": 22372076, "end": 22397404}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/overcooked_fryer_burned.png", "start": 22397404, "end": 22420034}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/overcooked_fryer_ready.png", "start": 22420034, "end": 22448160}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/overcooked_fryer_station.png", "start": 22448160, "end": 22473626}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/overcooked_meat_station.png", "start": 22473626, "end": 22501622}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/overcooked_order_board.png", "start": 22501622, "end": 22512560}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/overcooked_plate_station.png", "start": 22512560, "end": 22537516}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/overcooked_serving_station.png", "start": 22537516, "end": 22559267}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/overcooked_veg_station.png", "start": 22559267, "end": 22586997}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/overcooked_wash_station.png", "start": 22586997, "end": 22610430}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/oxygen_ex_dep.png", "start": 22610430, "end": 22617216}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/oxygen_extractor.clipped.png", "start": 22617216, "end": 22626857}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/oxygen_extractor.clipped2.png", "start": 22626857, "end": 22637665}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/oxygen_extractor.clipped3.png", "start": 22637665, "end": 22645075}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/oxygen_extractor.depleted.l1.png", "start": 22645075, "end": 22656473}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/oxygen_extractor.depleted.l10.png", "start": 22656473, "end": 22707717}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/oxygen_extractor.depleted.l2.png", "start": 22707717, "end": 22723261}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/oxygen_extractor.depleted.l3.png", "start": 22723261, "end": 22743486}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/oxygen_extractor.depleted.l4.png", "start": 22743486, "end": 22769084}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/oxygen_extractor.depleted.l5.png", "start": 22769084, "end": 22800782}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/oxygen_extractor.depleted.l6.png", "start": 22800782, "end": 22838487}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/oxygen_extractor.depleted.l7.png", "start": 22838487, "end": 22882871}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/oxygen_extractor.depleted.l8.png", "start": 22882871, "end": 22934115}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/oxygen_extractor.depleted.l9.png", "start": 22934115, "end": 22985359}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/oxygen_extractor.depleted.png", "start": 22985359, "end": 23016806}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/oxygen_extractor.full.png", "start": 23016806, "end": 23024468}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/oxygen_extractor.l1.png", "start": 23024468, "end": 23035874}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/oxygen_extractor.l10.png", "start": 23035874, "end": 23084529}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/oxygen_extractor.l2.png", "start": 23084529, "end": 23100110}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/oxygen_extractor.l3.png", "start": 23100110, "end": 23120261}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/oxygen_extractor.l4.png", "start": 23120261, "end": 23145395}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/oxygen_extractor.l5.png", "start": 23145395, "end": 23176100}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/oxygen_extractor.l6.png", "start": 23176100, "end": 23213039}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/oxygen_extractor.l7.png", "start": 23213039, "end": 23256550}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/oxygen_extractor.l8.png", "start": 23256550, "end": 23305205}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/oxygen_extractor.l9.png", "start": 23305205, "end": 23353860}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/oxygen_extractor.lamp.png", "start": 23353860, "end": 23358318}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/oxygen_extractor.png", "start": 23358318, "end": 23408654}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/oxygen_extractor.remnant.png", "start": 23408654, "end": 23428866}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/oxygen_extractor.working.png", "start": 23428866, "end": 23460359}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/paradox_station.png", "start": 23460359, "end": 23485653}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/patch_station.png", "start": 23485653, "end": 23521466}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/plate_station.png", "start": 23521466, "end": 23545694}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/probe_station.png", "start": 23545694, "end": 23566719}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/scout.mask.png", "start": 23566719, "end": 23574344}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/scout.png", "start": 23574344, "end": 23630337}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/scrambler.mask.png", "start": 23630337, "end": 23643829}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/scrambler.png", "start": 23643829, "end": 23706811}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/selection.png", "start": 23706811, "end": 23707534}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/ship.png", "start": 23707534, "end": 23869698}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/ship.shadow.png", "start": 23869698, "end": 23905964}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/silicon_ex_dep.png", "start": 23905964, "end": 23913880}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/silicon_extractor.clipped.png", "start": 23913880, "end": 23923994}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/silicon_extractor.clipped2.png", "start": 23923994, "end": 23935351}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/silicon_extractor.clipped3.png", "start": 23935351, "end": 23942785}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/silicon_extractor.depleted.l1.png", "start": 23942785, "end": 23955776}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/silicon_extractor.depleted.l10.png", "start": 23955776, "end": 24016086}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/silicon_extractor.depleted.l2.png", "start": 24016086, "end": 24033967}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/silicon_extractor.depleted.l3.png", "start": 24033967, "end": 24057373}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/silicon_extractor.depleted.l4.png", "start": 24057373, "end": 24086949}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/silicon_extractor.depleted.l5.png", "start": 24086949, "end": 24123486}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/silicon_extractor.depleted.l6.png", "start": 24123486, "end": 24167226}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/silicon_extractor.depleted.l7.png", "start": 24167226, "end": 24219020}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/silicon_extractor.depleted.l8.png", "start": 24219020, "end": 24279330}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/silicon_extractor.depleted.l9.png", "start": 24279330, "end": 24339640}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/silicon_extractor.depleted.png", "start": 24339640, "end": 24375806}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/silicon_extractor.full.png", "start": 24375806, "end": 24382899}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/silicon_extractor.l1.png", "start": 24382899, "end": 24395745}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/silicon_extractor.l10.png", "start": 24395745, "end": 24452178}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/silicon_extractor.l2.png", "start": 24452178, "end": 24469733}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/silicon_extractor.l3.png", "start": 24469733, "end": 24492645}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/silicon_extractor.l4.png", "start": 24492645, "end": 24521625}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/silicon_extractor.l5.png", "start": 24521625, "end": 24557108}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/silicon_extractor.l6.png", "start": 24557108, "end": 24599698}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/silicon_extractor.l7.png", "start": 24599698, "end": 24649990}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/silicon_extractor.l8.png", "start": 24649990, "end": 24706423}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/silicon_extractor.l9.png", "start": 24706423, "end": 24762856}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/silicon_extractor.lamp.png", "start": 24762856, "end": 24779146}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/silicon_extractor.png", "start": 24779146, "end": 24837445}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/silicon_extractor.remnant.png", "start": 24837445, "end": 24858392}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/silicon_extractor.working.png", "start": 24858392, "end": 24896483}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/slot_station.png", "start": 24896483, "end": 24951943}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/stake_buy_station.png", "start": 24951943, "end": 24994907}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/stake_sell_station.png", "start": 24994907, "end": 25048713}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/storage_a_station.png", "start": 25048713, "end": 25083755}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/storage_d_station.png", "start": 25083755, "end": 25122019}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/temple.png", "start": 25122019, "end": 25127559}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/trap.png", "start": 25127559, "end": 25133771}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/trash.png", "start": 25133771, "end": 25134873}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/unknown.png", "start": 25134873, "end": 25139903}, {"filename": "/packages/mettagrid/nim/mettascope/data/objects/wrench_station.png", "start": 25139903, "end": 25151257}, {"filename": "/packages/mettagrid/nim/mettascope/data/profiles/agent.mask.png", "start": 25151257, "end": 25161355}, {"filename": "/packages/mettagrid/nim/mettascope/data/profiles/agent.png", "start": 25161355, "end": 25207730}, {"filename": "/packages/mettagrid/nim/mettascope/data/profiles/aligner.mask.png", "start": 25207730, "end": 25215639}, {"filename": "/packages/mettagrid/nim/mettascope/data/profiles/aligner.png", "start": 25215639, "end": 25260440}, {"filename": "/packages/mettagrid/nim/mettascope/data/profiles/carbon_extractor.png", "start": 25260440, "end": 25321710}, {"filename": "/packages/mettagrid/nim/mettascope/data/profiles/chef.mask.png", "start": 25321710, "end": 25330243}, {"filename": "/packages/mettagrid/nim/mettascope/data/profiles/chef.png", "start": 25330243, "end": 25377042}, {"filename": "/packages/mettagrid/nim/mettascope/data/profiles/cog.png", "start": 25377042, "end": 25426573}, {"filename": "/packages/mettagrid/nim/mettascope/data/profiles/germanium_extractor.png", "start": 25426573, "end": 25486776}, {"filename": "/packages/mettagrid/nim/mettascope/data/profiles/hub.png", "start": 25486776, "end": 25556278}, {"filename": "/packages/mettagrid/nim/mettascope/data/profiles/junction.png", "start": 25556278, "end": 25614213}, {"filename": "/packages/mettagrid/nim/mettascope/data/profiles/miner.mask.png", "start": 25614213, "end": 25623826}, {"filename": "/packages/mettagrid/nim/mettascope/data/profiles/miner.png", "start": 25623826, "end": 25674625}, {"filename": "/packages/mettagrid/nim/mettascope/data/profiles/miner_pickaxe.mask.png", "start": 25674625, "end": 25682916}, {"filename": "/packages/mettagrid/nim/mettascope/data/profiles/miner_pickaxe.png", "start": 25682916, "end": 25731812}, {"filename": "/packages/mettagrid/nim/mettascope/data/profiles/oxygen_extractor.png", "start": 25731812, "end": 25790293}, {"filename": "/packages/mettagrid/nim/mettascope/data/profiles/scout.mask.png", "start": 25790293, "end": 25798314}, {"filename": "/packages/mettagrid/nim/mettascope/data/profiles/scout.png", "start": 25798314, "end": 25841048}, {"filename": "/packages/mettagrid/nim/mettascope/data/profiles/scrambler.mask.png", "start": 25841048, "end": 25850871}, {"filename": "/packages/mettagrid/nim/mettascope/data/profiles/scrambler.png", "start": 25850871, "end": 25901256}, {"filename": "/packages/mettagrid/nim/mettascope/data/profiles/silicon_extractor.png", "start": 25901256, "end": 25964845}, {"filename": "/packages/mettagrid/nim/mettascope/data/replays/default.json.z", "start": 25964845, "end": 25964944}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/agent_id.png", "start": 25964944, "end": 25966907}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/aligner.png", "start": 25966907, "end": 25972046}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/armor.png", "start": 25972046, "end": 25977653}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/battery.blue.png", "start": 25977653, "end": 25981178}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/battery.green.png", "start": 25981178, "end": 25984460}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/battery.png", "start": 25984460, "end": 25989764}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/battery.red.png", "start": 25989764, "end": 25994018}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/battery_blue.png", "start": 25994018, "end": 25997543}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/battery_green.png", "start": 25997543, "end": 26000825}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/battery_red.png", "start": 26000825, "end": 26005079}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/blueprint.png", "start": 26005079, "end": 26010527}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/carbon.png", "start": 26010527, "end": 26016560}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/cargo.png", "start": 26016560, "end": 26021949}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/carnivore.png", "start": 26021949, "end": 26027081}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/chop_meat_progress.png", "start": 26027081, "end": 26031871}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/chop_veg_progress.png", "start": 26031871, "end": 26036375}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/chopped_meat.png", "start": 26036375, "end": 26040235}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/chopped_veg.png", "start": 26040235, "end": 26045040}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/clean_plate.png", "start": 26045040, "end": 26048270}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/core.png", "start": 26048270, "end": 26053022}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/core_a.png", "start": 26053022, "end": 26056222}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/core_d.png", "start": 26056222, "end": 26061697}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/cores.png", "start": 26061697, "end": 26066996}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/creds.png", "start": 26066996, "end": 26068711}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/curve_reserve.png", "start": 26068711, "end": 26074015}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/decoder.png", "start": 26074015, "end": 26076197}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/dirty_plate.png", "start": 26076197, "end": 26080873}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/dish_fries.png", "start": 26080873, "end": 26086844}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/dish_salad.png", "start": 26086844, "end": 26091151}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/dish_soup.png", "start": 26091151, "end": 26096466}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/dogma.png", "start": 26096466, "end": 26102701}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/dps.png", "start": 26102701, "end": 26104365}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/drill.png", "start": 26104365, "end": 26111167}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/energy.png", "start": 26111167, "end": 26113724}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/firewall.png", "start": 26113724, "end": 26120094}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/fryer_fries_burned.png", "start": 26120094, "end": 26126981}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/fryer_fries_cooking.png", "start": 26126981, "end": 26131420}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/fryer_fries_ready.png", "start": 26131420, "end": 26136253}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/fryer_ready_age.png", "start": 26136253, "end": 26139104}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/fryer_timer.png", "start": 26139104, "end": 26144094}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/gen_a.png", "start": 26144094, "end": 26147266}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/gen_d.png", "start": 26147266, "end": 26153479}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/germanium.png", "start": 26153479, "end": 26161686}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/heart.png", "start": 26161686, "end": 26169559}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/heart_old.png", "start": 26169559, "end": 26173246}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/herbivore.png", "start": 26173246, "end": 26178269}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/insulator.png", "start": 26178269, "end": 26185323}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/lance.png", "start": 26185323, "end": 26190583}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/laser.png", "start": 26190583, "end": 26196790}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/level.png", "start": 26196790, "end": 26201982}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/meat.png", "start": 26201982, "end": 26205942}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/meme.png", "start": 26205942, "end": 26212347}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/miner.png", "start": 26212347, "end": 26217714}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/modulator.png", "start": 26217714, "end": 26219474}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/ore.blue.png", "start": 26219474, "end": 26225742}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/ore.green.png", "start": 26225742, "end": 26231442}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/ore.png", "start": 26231442, "end": 26237272}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/ore.red.png", "start": 26237272, "end": 26243468}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/ore_blue.png", "start": 26243468, "end": 26249736}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/ore_green.png", "start": 26249736, "end": 26255436}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/ore_red.png", "start": 26255436, "end": 26261632}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/os_a.png", "start": 26261632, "end": 26268748}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/os_d.png", "start": 26268748, "end": 26272837}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/oxygen.png", "start": 26272837, "end": 26279110}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/paradox.png", "start": 26279110, "end": 26285104}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/patch.png", "start": 26285104, "end": 26285249}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/plate.png", "start": 26285249, "end": 26290621}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/pot_ready_age.png", "start": 26290621, "end": 26296410}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/pot_soup_burned.png", "start": 26296410, "end": 26302288}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/pot_soup_cooking.png", "start": 26302288, "end": 26308874}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/pot_soup_ready.png", "start": 26308874, "end": 26312262}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/pot_timer.png", "start": 26312262, "end": 26318102}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/probe.png", "start": 26318102, "end": 26322477}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/queue_fries.png", "start": 26322477, "end": 26326200}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/queue_salad.png", "start": 26326200, "end": 26330103}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/queue_soup.png", "start": 26330103, "end": 26334817}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/recipe_carbon.png", "start": 26334817, "end": 26340850}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/recipe_germanium.png", "start": 26340850, "end": 26349057}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/recipe_oxygen.png", "start": 26349057, "end": 26355330}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/recipe_silicon.png", "start": 26355330, "end": 26361162}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/recoil.png", "start": 26361162, "end": 26365990}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/resonator.png", "start": 26365990, "end": 26368380}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/reward.png", "start": 26368380, "end": 26373830}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/scorch.png", "start": 26373830, "end": 26379906}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/scout.png", "start": 26379906, "end": 26384929}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/scrambled.png", "start": 26384929, "end": 26389927}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/scrambler.png", "start": 26389927, "end": 26392006}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/security.png", "start": 26392006, "end": 26397613}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/silicon.png", "start": 26397613, "end": 26403445}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/stake_cost.png", "start": 26403445, "end": 26404416}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/star.png", "start": 26404416, "end": 26409608}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/storage_a.png", "start": 26409608, "end": 26414017}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/storage_d.png", "start": 26414017, "end": 26419068}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/ticket_fries.png", "start": 26419068, "end": 26422510}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/ticket_salad.png", "start": 26422510, "end": 26425590}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/ticket_soup.png", "start": 26425590, "end": 26429138}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/total_stake.png", "start": 26429138, "end": 26434330}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/tripwire.png", "start": 26434330, "end": 26439447}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/unknown.png", "start": 26439447, "end": 26443852}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/veg.png", "start": 26443852, "end": 26449748}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/wash_progress.png", "start": 26449748, "end": 26454379}, {"filename": "/packages/mettagrid/nim/mettascope/data/resources/wrench.png", "start": 26454379, "end": 26460130}, {"filename": "/packages/mettagrid/nim/mettascope/data/selection.png", "start": 26460130, "end": 26462140}, {"filename": "/packages/mettagrid/nim/mettascope/data/sounds/UIbutton.wav", "start": 26462140, "end": 26480978, "audio": 1}, {"filename": "/packages/mettagrid/nim/mettascope/data/sounds/UIscrub1.wav", "start": 26480978, "end": 26487656, "audio": 1}, {"filename": "/packages/mettagrid/nim/mettascope/data/sounds/UIscrub2.wav", "start": 26487656, "end": 26507534, "audio": 1}, {"filename": "/packages/mettagrid/nim/mettascope/data/sounds/UIscrub3.wav", "start": 26507534, "end": 26544228, "audio": 1}, {"filename": "/packages/mettagrid/nim/mettascope/data/sounds/UIswitch.wav", "start": 26544228, "end": 26559226, "audio": 1}, {"filename": "/packages/mettagrid/nim/mettascope/data/sounds/alignment_clips.wav", "start": 26559226, "end": 26757408, "audio": 1}, {"filename": "/packages/mettagrid/nim/mettascope/data/sounds/alignment_cogs.wav", "start": 26757408, "end": 27065486, "audio": 1}, {"filename": "/packages/mettagrid/nim/mettascope/data/sounds/carbon_extractor.wav", "start": 27065486, "end": 27360788, "audio": 1}, {"filename": "/packages/mettagrid/nim/mettascope/data/sounds/cogLoseEnergy.wav", "start": 27360788, "end": 27796366, "audio": 1}, {"filename": "/packages/mettagrid/nim/mettascope/data/sounds/cogchange_aligner.wav", "start": 27796366, "end": 28175180, "audio": 1}, {"filename": "/packages/mettagrid/nim/mettascope/data/sounds/cogchange_hacker.wav", "start": 28175180, "end": 28568820, "audio": 1}, {"filename": "/packages/mettagrid/nim/mettascope/data/sounds/cogchange_miner.wav", "start": 28568820, "end": 28935086, "audio": 1}, {"filename": "/packages/mettagrid/nim/mettascope/data/sounds/cogchange_regular.wav", "start": 28935086, "end": 29317320, "audio": 1}, {"filename": "/packages/mettagrid/nim/mettascope/data/sounds/entity_selection.wav", "start": 29317320, "end": 29336158, "audio": 1}, {"filename": "/packages/mettagrid/nim/mettascope/data/sounds/germanium_extractor.wav", "start": 29336158, "end": 29557558, "audio": 1}, {"filename": "/packages/mettagrid/nim/mettascope/data/sounds/hub.wav", "start": 29557558, "end": 29845870, "audio": 1}, {"filename": "/packages/mettagrid/nim/mettascope/data/sounds/oxygen_extractor.wav", "start": 29845870, "end": 30169604, "audio": 1}, {"filename": "/packages/mettagrid/nim/mettascope/data/sounds/silicon_extractor.wav", "start": 30169604, "end": 30470572, "audio": 1}, {"filename": "/packages/mettagrid/nim/mettascope/data/sounds/testsound.wav", "start": 30470572, "end": 30666618, "audio": 1}, {"filename": "/packages/mettagrid/nim/mettascope/data/starfield/clouds.png", "start": 30666618, "end": 31280199}, {"filename": "/packages/mettagrid/nim/mettascope/data/starfield/starfield.png", "start": 31280199, "end": 31656097}, {"filename": "/packages/mettagrid/nim/mettascope/data/target.png", "start": 31656097, "end": 31661270}, {"filename": "/packages/mettagrid/nim/mettascope/data/terrain/blob7x8.png", "start": 31661270, "end": 33423550}, {"filename": "/packages/mettagrid/nim/mettascope/data/terrain/mask7x8.png", "start": 33423550, "end": 33562324}, {"filename": "/packages/mettagrid/nim/mettascope/data/terrain/pipegrid.ee.png", "start": 33562324, "end": 33566161}, {"filename": "/packages/mettagrid/nim/mettascope/data/terrain/pipegrid.en.png", "start": 33566161, "end": 33570834}, {"filename": "/packages/mettagrid/nim/mettascope/data/terrain/pipegrid.end.e.png", "start": 33570834, "end": 33573472}, {"filename": "/packages/mettagrid/nim/mettascope/data/terrain/pipegrid.end.n.png", "start": 33573472, "end": 33576474}, {"filename": "/packages/mettagrid/nim/mettascope/data/terrain/pipegrid.end.s.png", "start": 33576474, "end": 33579518}, {"filename": "/packages/mettagrid/nim/mettascope/data/terrain/pipegrid.end.w.png", "start": 33579518, "end": 33582033}, {"filename": "/packages/mettagrid/nim/mettascope/data/terrain/pipegrid.nn.png", "start": 33582033, "end": 33586223}, {"filename": "/packages/mettagrid/nim/mettascope/data/terrain/pipegrid.nw.png", "start": 33586223, "end": 33590922}, {"filename": "/packages/mettagrid/nim/mettascope/data/terrain/pipegrid.se.png", "start": 33590922, "end": 33595556}, {"filename": "/packages/mettagrid/nim/mettascope/data/terrain/pipegrid.ss.png", "start": 33595556, "end": 33600097}, {"filename": "/packages/mettagrid/nim/mettascope/data/terrain/pipegrid.ws.png", "start": 33600097, "end": 33604785}, {"filename": "/packages/mettagrid/nim/mettascope/data/terrain/pipegrid.ww.png", "start": 33604785, "end": 33613991}, {"filename": "/packages/mettagrid/nim/mettascope/data/terrain/repeating.sand.png", "start": 33613991, "end": 35469740}, {"filename": "/packages/mettagrid/nim/mettascope/data/terrain/splat1.png", "start": 35469740, "end": 35968331}, {"filename": "/packages/mettagrid/nim/mettascope/data/terrain/splat2.png", "start": 35968331, "end": 36517932}, {"filename": "/packages/mettagrid/nim/mettascope/data/terrain/splat3.png", "start": 36517932, "end": 37222537}, {"filename": "/packages/mettagrid/nim/mettascope/data/terrain/splat4.png", "start": 37222537, "end": 37845450}, {"filename": "/packages/mettagrid/nim/mettascope/data/terrain/splat5.png", "start": 37845450, "end": 38405192}, {"filename": "/packages/mettagrid/nim/mettascope/data/terrain/splat6.png", "start": 38405192, "end": 38984468}, {"filename": "/packages/mettagrid/nim/mettascope/data/terrain/splat7.png", "start": 38984468, "end": 39440650}, {"filename": "/packages/mettagrid/nim/mettascope/data/terrain/splat8.png", "start": 39440650, "end": 39878423}, {"filename": "/packages/mettagrid/nim/mettascope/data/terrain/stamp.carbon.png", "start": 39878423, "end": 40164681}, {"filename": "/packages/mettagrid/nim/mettascope/data/terrain/stamp.germanium.png", "start": 40164681, "end": 40327599}, {"filename": "/packages/mettagrid/nim/mettascope/data/terrain/stamp.hub.png", "start": 40327599, "end": 40693642}, {"filename": "/packages/mettagrid/nim/mettascope/data/terrain/stamp.junction.png", "start": 40693642, "end": 41005211}, {"filename": "/packages/mettagrid/nim/mettascope/data/terrain/stamp.oxygen.png", "start": 41005211, "end": 41421141}, {"filename": "/packages/mettagrid/nim/mettascope/data/terrain/stamp.silicon.png", "start": 41421141, "end": 41739858}, {"filename": "/packages/mettagrid/nim/mettascope/data/theme/IBMPlexSans-Regular.ttf", "start": 41739858, "end": 41926218}, {"filename": "/packages/mettagrid/nim/mettascope/data/theme/button.9patch.png", "start": 41926218, "end": 41927572}, {"filename": "/packages/mettagrid/nim/mettascope/data/theme/button.down.9patch.png", "start": 41927572, "end": 41928980}, {"filename": "/packages/mettagrid/nim/mettascope/data/theme/button.hover.9patch.png", "start": 41928980, "end": 41930353}, {"filename": "/packages/mettagrid/nim/mettascope/data/theme/check.off.png", "start": 41930353, "end": 41931162}, {"filename": "/packages/mettagrid/nim/mettascope/data/theme/check.on.png", "start": 41931162, "end": 41932099}, {"filename": "/packages/mettagrid/nim/mettascope/data/theme/close.png", "start": 41932099, "end": 41932341}, {"filename": "/packages/mettagrid/nim/mettascope/data/theme/droparrow.png", "start": 41932341, "end": 41932807}, {"filename": "/packages/mettagrid/nim/mettascope/data/theme/dropdown.9patch.png", "start": 41932807, "end": 41933147}, {"filename": "/packages/mettagrid/nim/mettascope/data/theme/frame.9patch.png", "start": 41933147, "end": 41933472}, {"filename": "/packages/mettagrid/nim/mettascope/data/theme/header.9patch.png", "start": 41933472, "end": 41933760}, {"filename": "/packages/mettagrid/nim/mettascope/data/theme/header.dragging.9patch.png", "start": 41933760, "end": 41934051}, {"filename": "/packages/mettagrid/nim/mettascope/data/theme/header.hover.9patch.png", "start": 41934051, "end": 41934347}, {"filename": "/packages/mettagrid/nim/mettascope/data/theme/input.9patch.png", "start": 41934347, "end": 41935748}, {"filename": "/packages/mettagrid/nim/mettascope/data/theme/maximized.png", "start": 41935748, "end": 41936079}, {"filename": "/packages/mettagrid/nim/mettascope/data/theme/minimized.png", "start": 41936079, "end": 41936450}, {"filename": "/packages/mettagrid/nim/mettascope/data/theme/panel.body.9patch.png", "start": 41936450, "end": 41936629}, {"filename": "/packages/mettagrid/nim/mettascope/data/theme/panel.body.empty.9patch.png", "start": 41936629, "end": 41936803}, {"filename": "/packages/mettagrid/nim/mettascope/data/theme/panel.header.9patch.png", "start": 41936803, "end": 41936986}, {"filename": "/packages/mettagrid/nim/mettascope/data/theme/panel.tab.9patch.png", "start": 41936986, "end": 41937172}, {"filename": "/packages/mettagrid/nim/mettascope/data/theme/panel.tab.hover.9patch.png", "start": 41937172, "end": 41937362}, {"filename": "/packages/mettagrid/nim/mettascope/data/theme/panel.tab.selected.9patch.png", "start": 41937362, "end": 41937547}, {"filename": "/packages/mettagrid/nim/mettascope/data/theme/progressBar.body.9patch.png", "start": 41937547, "end": 41937862}, {"filename": "/packages/mettagrid/nim/mettascope/data/theme/progressBar.progress.9patch.png", "start": 41937862, "end": 41938176}, {"filename": "/packages/mettagrid/nim/mettascope/data/theme/radio.off.png", "start": 41938176, "end": 41939172}, {"filename": "/packages/mettagrid/nim/mettascope/data/theme/radio.on.png", "start": 41939172, "end": 41940350}, {"filename": "/packages/mettagrid/nim/mettascope/data/theme/resize.png", "start": 41940350, "end": 41940624}, {"filename": "/packages/mettagrid/nim/mettascope/data/theme/scrollbar.9patch.png", "start": 41940624, "end": 41940815}, {"filename": "/packages/mettagrid/nim/mettascope/data/theme/scrollbar.track.9patch.png", "start": 41940815, "end": 41941056}, {"filename": "/packages/mettagrid/nim/mettascope/data/theme/scrubber.body.9patch.png", "start": 41941056, "end": 41941371}, {"filename": "/packages/mettagrid/nim/mettascope/data/theme/scrubber.handle.png", "start": 41941371, "end": 41941760}, {"filename": "/packages/mettagrid/nim/mettascope/data/theme/scrubber.track.9patch.png", "start": 41941760, "end": 41943218}, {"filename": "/packages/mettagrid/nim/mettascope/data/theme/testTexture.png", "start": 41943218, "end": 41956036}, {"filename": "/packages/mettagrid/nim/mettascope/data/theme/textbox.9patch.png", "start": 41956036, "end": 41957437}, {"filename": "/packages/mettagrid/nim/mettascope/data/theme/textbox.disabled.9patch.png", "start": 41957437, "end": 41957967}, {"filename": "/packages/mettagrid/nim/mettascope/data/theme/textbox.error.9patch.png", "start": 41957967, "end": 41958597}, {"filename": "/packages/mettagrid/nim/mettascope/data/theme/tooltip.9patch.png", "start": 41958597, "end": 41959277}, {"filename": "/packages/mettagrid/nim/mettascope/data/theme/window.9patch.png", "start": 41959277, "end": 41960428}, {"filename": "/packages/mettagrid/nim/mettascope/data/tile.png", "start": 41960428, "end": 41960669}, {"filename": "/packages/mettagrid/nim/mettascope/data/trace/attack.png", "start": 41960669, "end": 41963806}, {"filename": "/packages/mettagrid/nim/mettascope/data/trace/attack_nearest.png", "start": 41963806, "end": 41968189}, {"filename": "/packages/mettagrid/nim/mettascope/data/trace/change_color.png", "start": 41968189, "end": 41970735}, {"filename": "/packages/mettagrid/nim/mettascope/data/trace/frozen.png", "start": 41970735, "end": 41973951}, {"filename": "/packages/mettagrid/nim/mettascope/data/trace/get_items.png", "start": 41973951, "end": 41976281}, {"filename": "/packages/mettagrid/nim/mettascope/data/trace/invalid.png", "start": 41976281, "end": 41976649}, {"filename": "/packages/mettagrid/nim/mettascope/data/trace/move.png", "start": 41976649, "end": 41979397}, {"filename": "/packages/mettagrid/nim/mettascope/data/trace/move_8way.png", "start": 41979397, "end": 41983558}, {"filename": "/packages/mettagrid/nim/mettascope/data/trace/move_cardinal.png", "start": 41983558, "end": 41987875}, {"filename": "/packages/mettagrid/nim/mettascope/data/trace/noop.png", "start": 41987875, "end": 41990615}, {"filename": "/packages/mettagrid/nim/mettascope/data/trace/put_items.png", "start": 41990615, "end": 41992866}, {"filename": "/packages/mettagrid/nim/mettascope/data/trace/rotate.png", "start": 41992866, "end": 41995778}, {"filename": "/packages/mettagrid/nim/mettascope/data/trace/swap.png", "start": 41995778, "end": 41998739}, {"filename": "/packages/mettagrid/nim/mettascope/data/trace/unknown.png", "start": 41998739, "end": 42001303}, {"filename": "/packages/mettagrid/nim/mettascope/data/ui/add.png", "start": 42001303, "end": 42001476}, {"filename": "/packages/mettagrid/nim/mettascope/data/ui/add@2x.png", "start": 42001476, "end": 42001740}, {"filename": "/packages/mettagrid/nim/mettascope/data/ui/bar_spacer.png", "start": 42001740, "end": 42006882}, {"filename": "/packages/mettagrid/nim/mettascope/data/ui/bar_stopLeft.png", "start": 42006882, "end": 42015165}, {"filename": "/packages/mettagrid/nim/mettascope/data/ui/bar_stopRight.png", "start": 42015165, "end": 42022777}, {"filename": "/packages/mettagrid/nim/mettascope/data/ui/barstretch.png", "start": 42022777, "end": 42070792}, {"filename": "/packages/mettagrid/nim/mettascope/data/ui/button_main.down.png", "start": 42070792, "end": 42080049}, {"filename": "/packages/mettagrid/nim/mettascope/data/ui/button_main.hover.png", "start": 42080049, "end": 42088300}, {"filename": "/packages/mettagrid/nim/mettascope/data/ui/button_speed.down.png", "start": 42088300, "end": 42092039}, {"filename": "/packages/mettagrid/nim/mettascope/data/ui/button_speed.up.png", "start": 42092039, "end": 42095638}, {"filename": "/packages/mettagrid/nim/mettascope/data/ui/button_unit.down.png", "start": 42095638, "end": 42101981}, {"filename": "/packages/mettagrid/nim/mettascope/data/ui/button_unit.up.png", "start": 42101981, "end": 42108599}, {"filename": "/packages/mettagrid/nim/mettascope/data/ui/cloud.png", "start": 42108599, "end": 42108894}, {"filename": "/packages/mettagrid/nim/mettascope/data/ui/eye.png", "start": 42108894, "end": 42109298}, {"filename": "/packages/mettagrid/nim/mettascope/data/ui/grid.png", "start": 42109298, "end": 42109476}, {"filename": "/packages/mettagrid/nim/mettascope/data/ui/heart.png", "start": 42109476, "end": 42109848}, {"filename": "/packages/mettagrid/nim/mettascope/data/ui/heatmap.png", "start": 42109848, "end": 42110070}, {"filename": "/packages/mettagrid/nim/mettascope/data/ui/heatmap@2x.png", "start": 42110070, "end": 42110340}, {"filename": "/packages/mettagrid/nim/mettascope/data/ui/help.png", "start": 42110340, "end": 42110828}, {"filename": "/packages/mettagrid/nim/mettascope/data/ui/help@2x.png", "start": 42110828, "end": 42111768}, {"filename": "/packages/mettagrid/nim/mettascope/data/ui/logo.png", "start": 42111768, "end": 42114158}, {"filename": "/packages/mettagrid/nim/mettascope/data/ui/move.png", "start": 42114158, "end": 42114580}, {"filename": "/packages/mettagrid/nim/mettascope/data/ui/panel_bottomleft.png", "start": 42114580, "end": 42266339}, {"filename": "/packages/mettagrid/nim/mettascope/data/ui/panel_bottomright.png", "start": 42266339, "end": 42446971}, {"filename": "/packages/mettagrid/nim/mettascope/data/ui/panel_center.png", "start": 42446971, "end": 42652204}, {"filename": "/packages/mettagrid/nim/mettascope/data/ui/panel_topleft.png", "start": 42652204, "end": 42706867}, {"filename": "/packages/mettagrid/nim/mettascope/data/ui/panel_topright.png", "start": 42706867, "end": 42794286}, {"filename": "/packages/mettagrid/nim/mettascope/data/ui/pause.png", "start": 42794286, "end": 42794495}, {"filename": "/packages/mettagrid/nim/mettascope/data/ui/play.png", "start": 42794495, "end": 42794786}, {"filename": "/packages/mettagrid/nim/mettascope/data/ui/queue.png", "start": 42794786, "end": 42795074}, {"filename": "/packages/mettagrid/nim/mettascope/data/ui/rabbit.png", "start": 42795074, "end": 42795431}, {"filename": "/packages/mettagrid/nim/mettascope/data/ui/repeat.png", "start": 42795431, "end": 42796012}, {"filename": "/packages/mettagrid/nim/mettascope/data/ui/resource_bg.png", "start": 42796012, "end": 42799004}, {"filename": "/packages/mettagrid/nim/mettascope/data/ui/rewindToEnd.png", "start": 42799004, "end": 42799362}, {"filename": "/packages/mettagrid/nim/mettascope/data/ui/rewindToStart.png", "start": 42799362, "end": 42799709}, {"filename": "/packages/mettagrid/nim/mettascope/data/ui/right-arrow.png", "start": 42799709, "end": 42799879}, {"filename": "/packages/mettagrid/nim/mettascope/data/ui/right-arrow@2x.png", "start": 42799879, "end": 42800107}, {"filename": "/packages/mettagrid/nim/mettascope/data/ui/share.png", "start": 42800107, "end": 42800400}, {"filename": "/packages/mettagrid/nim/mettascope/data/ui/share@2x.png", "start": 42800400, "end": 42800804}, {"filename": "/packages/mettagrid/nim/mettascope/data/ui/shield.png", "start": 42800804, "end": 42800976}, {"filename": "/packages/mettagrid/nim/mettascope/data/ui/soundMute.png", "start": 42800976, "end": 42801572}, {"filename": "/packages/mettagrid/nim/mettascope/data/ui/speed.png", "start": 42801572, "end": 42801854}, {"filename": "/packages/mettagrid/nim/mettascope/data/ui/stepBack.png", "start": 42801854, "end": 42802172}, {"filename": "/packages/mettagrid/nim/mettascope/data/ui/stepForward.png", "start": 42802172, "end": 42802489}, {"filename": "/packages/mettagrid/nim/mettascope/data/ui/sword.png", "start": 42802489, "end": 42802603}, {"filename": "/packages/mettagrid/nim/mettascope/data/ui/tack.png", "start": 42802603, "end": 42802915}, {"filename": "/packages/mettagrid/nim/mettascope/data/ui/timeslider.png", "start": 42802915, "end": 42816805}, {"filename": "/packages/mettagrid/nim/mettascope/data/ui/transportButton.down.png", "start": 42816805, "end": 42820379}, {"filename": "/packages/mettagrid/nim/mettascope/data/ui/transportButton.hover.png", "start": 42820379, "end": 42824539}, {"filename": "/packages/mettagrid/nim/mettascope/data/ui/transportButton.up.png", "start": 42824539, "end": 42828053}, {"filename": "/packages/mettagrid/nim/mettascope/data/ui/turtle.png", "start": 42828053, "end": 42828404}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/LICENSE.md", "start": 42828404, "end": 42832618}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/alembic.png", "start": 42832618, "end": 42837331}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/aligner.png", "start": 42837331, "end": 42841866}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/angry.png", "start": 42841866, "end": 42846308}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/anxious.png", "start": 42846308, "end": 42851372}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/asterisk.png", "start": 42851372, "end": 42854065}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/attack.png", "start": 42854065, "end": 42855126}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/backpack.png", "start": 42855126, "end": 42860046}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/battery.png", "start": 42860046, "end": 42863717}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/beaming.png", "start": 42863717, "end": 42868534}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/black-circle.png", "start": 42868534, "end": 42871106}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/black-heart.png", "start": 42871106, "end": 42874121}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/blue-circle.png", "start": 42874121, "end": 42877148}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/blue-diamond.png", "start": 42877148, "end": 42879144}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/blue-heart.png", "start": 42879144, "end": 42882665}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/blue.png", "start": 42882665, "end": 42885692}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/bow.png", "start": 42885692, "end": 42890663}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/broken-heart.png", "start": 42890663, "end": 42894822}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/brown-circle.png", "start": 42894822, "end": 42897801}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/brown-heart.png", "start": 42897801, "end": 42901264}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/brown-square.png", "start": 42901264, "end": 42902212}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/buy.png", "start": 42902212, "end": 42904156}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/carbon.png", "start": 42904156, "end": 42908584}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/carbon_a.png", "start": 42908584, "end": 42913285}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/carbon_b.png", "start": 42913285, "end": 42917915}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/carrot.png", "start": 42917915, "end": 42920997}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/cash.png", "start": 42920997, "end": 42925048}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/charger.png", "start": 42925048, "end": 42928719}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/chart-down.png", "start": 42928719, "end": 42932615}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/chart-up.png", "start": 42932615, "end": 42936508}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/chest.png", "start": 42936508, "end": 42940242}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/clown.png", "start": 42940242, "end": 42945604}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/coin.png", "start": 42945604, "end": 42950772}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/compass.png", "start": 42950772, "end": 42956336}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/confused.png", "start": 42956336, "end": 42960748}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/corn.png", "start": 42960748, "end": 42965748}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/cred.png", "start": 42965748, "end": 42970916}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/crying-cat.png", "start": 42970916, "end": 42975774}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/crying.png", "start": 42975774, "end": 42980583}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/dagger.png", "start": 42980583, "end": 42984597}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/default.png", "start": 42984597, "end": 42988754}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/diamond.png", "start": 42988754, "end": 42992490}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/divide.png", "start": 42992490, "end": 42995221}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/down-left.png", "start": 42995221, "end": 42997166}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/down-right.png", "start": 42997166, "end": 42999129}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/down.png", "start": 42999129, "end": 43000985}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/drooling.png", "start": 43000985, "end": 43005867}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/eight.png", "start": 43005867, "end": 43008525}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/factory.png", "start": 43008525, "end": 43012754}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/fearful.png", "start": 43012754, "end": 43017567}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/fire.png", "start": 43017567, "end": 43021164}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/five.png", "start": 43021164, "end": 43023663}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/four.png", "start": 43023663, "end": 43025976}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/fuel.png", "start": 43025976, "end": 43030732}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/gear.png", "start": 43030732, "end": 43035299}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/germanium.png", "start": 43035299, "end": 43040103}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/germanium_a.png", "start": 43040103, "end": 43045001}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/germanium_b.png", "start": 43045001, "end": 43049802}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/ghost.png", "start": 43049802, "end": 43054506}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/green-circle.png", "start": 43054506, "end": 43057461}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/green-cpu.png", "start": 43057461, "end": 43060038}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/green-heart.png", "start": 43060038, "end": 43063484}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/green.png", "start": 43063484, "end": 43066439}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/grinning-big-eyes.png", "start": 43066439, "end": 43071232}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/grinning-smiling-eyes.png", "start": 43071232, "end": 43076063}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/grinning.png", "start": 43076063, "end": 43080804}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/growing-heart.png", "start": 43080804, "end": 43084903}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/halo.png", "start": 43084903, "end": 43089943}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/hammer.png", "start": 43089943, "end": 43093335}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/hash.png", "start": 43093335, "end": 43096011}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/heal.png", "start": 43096011, "end": 43096904}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/heart-arrow.png", "start": 43096904, "end": 43101030}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/heart-decoration.png", "start": 43101030, "end": 43103719}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/heart-exclamation.png", "start": 43103719, "end": 43106848}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/heart-eyes.png", "start": 43106848, "end": 43111652}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/heart-ribbon.png", "start": 43111652, "end": 43116091}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/heart.png", "start": 43116091, "end": 43121550}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/heart_a.png", "start": 43121550, "end": 43127233}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/heart_b.png", "start": 43127233, "end": 43132841}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/hearts.png", "start": 43132841, "end": 43134648}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/hub.png", "start": 43134648, "end": 43137819}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/hundred.png", "start": 43137819, "end": 43143074}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/jump.png", "start": 43143074, "end": 43145917}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/kiss.png", "start": 43145917, "end": 43150626}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/left.png", "start": 43150626, "end": 43152465}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/light-shade.png", "start": 43152465, "end": 43155369}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/lightning.png", "start": 43155369, "end": 43158302}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/love-letter.png", "start": 43158302, "end": 43161080}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/medium-shade.png", "start": 43161080, "end": 43163943}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/miner.png", "start": 43163943, "end": 43167453}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/minus.png", "start": 43167453, "end": 43168307}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/moai.png", "start": 43168307, "end": 43172162}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/money.png", "start": 43172162, "end": 43176213}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/monocle.png", "start": 43176213, "end": 43181511}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/mountain.png", "start": 43181511, "end": 43185626}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/multiply.png", "start": 43185626, "end": 43189605}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/nine.png", "start": 43189605, "end": 43192155}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/numbers.png", "start": 43192155, "end": 43195168}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/oil.png", "start": 43195168, "end": 43198874}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/one.png", "start": 43198874, "end": 43200634}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/orange-circle.png", "start": 43200634, "end": 43203142}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/orange-heart.png", "start": 43203142, "end": 43206124}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/orange-square.png", "start": 43206124, "end": 43206939}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/oxygen.png", "start": 43206939, "end": 43210876}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/oxygen_a.png", "start": 43210876, "end": 43215135}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/oxygen_b.png", "start": 43215135, "end": 43219338}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/package.png", "start": 43219338, "end": 43223072}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/paperclip.png", "start": 43223072, "end": 43228183}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/patch.png", "start": 43228183, "end": 43229099}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/pin.png", "start": 43229099, "end": 43231091}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/plug.png", "start": 43231091, "end": 43234814}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/plus.png", "start": 43234814, "end": 43236758}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/pouting.png", "start": 43236758, "end": 43241169}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/purple-circle.png", "start": 43241169, "end": 43244257}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/purple-heart.png", "start": 43244257, "end": 43247845}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/purple-square.png", "start": 43247845, "end": 43248820}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/pushpin.png", "start": 43248820, "end": 43252555}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/red-circle.png", "start": 43252555, "end": 43255436}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/red-heart.png", "start": 43255436, "end": 43258851}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/red-triangle.png", "start": 43258851, "end": 43260351}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/red.png", "start": 43260351, "end": 43263232}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/revolving-hearts.png", "start": 43263232, "end": 43268115}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/right.png", "start": 43268115, "end": 43269956}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/rock.png", "start": 43269956, "end": 43274150}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/rocket.png", "start": 43274150, "end": 43279243}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/rofl.png", "start": 43279243, "end": 43284752}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/rolling-eyes.png", "start": 43284752, "end": 43289372}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/rotate-clockwise.png", "start": 43289372, "end": 43292301}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/rotate.png", "start": 43292301, "end": 43295575}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/savoring.png", "start": 43295575, "end": 43300304}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/scout.png", "start": 43300304, "end": 43304387}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/scrambler.png", "start": 43304387, "end": 43309355}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/seahorse.png", "start": 43309355, "end": 43313146}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/sell.png", "start": 43313146, "end": 43314000}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/seven.png", "start": 43314000, "end": 43316202}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/shield.png", "start": 43316202, "end": 43320212}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/silicon.png", "start": 43320212, "end": 43325767}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/silicon_a.png", "start": 43325767, "end": 43331512}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/silicon_b.png", "start": 43331512, "end": 43337156}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/six.png", "start": 43337156, "end": 43339686}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/skull-crossbones.png", "start": 43339686, "end": 43344429}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/sleepy.png", "start": 43344429, "end": 43349320}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/small-blue-diamond.png", "start": 43349320, "end": 43350419}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/smiling.png", "start": 43350419, "end": 43355063}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/smirking.png", "start": 43355063, "end": 43359637}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/sobbing.png", "start": 43359637, "end": 43364756}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/sparkle.png", "start": 43364756, "end": 43366016}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/sparkling-heart.png", "start": 43366016, "end": 43370730}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/squinting.png", "start": 43370730, "end": 43375723}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/star-struck.png", "start": 43375723, "end": 43380660}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/star.png", "start": 43380660, "end": 43385852}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/swap.png", "start": 43385852, "end": 43386153}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/swearing.png", "start": 43386153, "end": 43390974}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/swords.png", "start": 43390974, "end": 43395649}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/target.png", "start": 43395649, "end": 43400542}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/tears-of-joy.png", "start": 43400542, "end": 43405841}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/tech.png", "start": 43405841, "end": 43410408}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/ten.png", "start": 43410408, "end": 43412967}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/test-tube.png", "start": 43412967, "end": 43416116}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/three.png", "start": 43416116, "end": 43418754}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/trap.png", "start": 43418754, "end": 43424476}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/tree.png", "start": 43424476, "end": 43428305}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/two-hearts.png", "start": 43428305, "end": 43432383}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/two.png", "start": 43432383, "end": 43434919}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/up-left.png", "start": 43434919, "end": 43436882}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/up-right.png", "start": 43436882, "end": 43438864}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/up.png", "start": 43438864, "end": 43440733}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/wall.png", "start": 43440733, "end": 43441548}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/water.png", "start": 43441548, "end": 43444080}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/wave.png", "start": 43444080, "end": 43448849}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/weapon.png", "start": 43448849, "end": 43453524}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/wheat.png", "start": 43453524, "end": 43457845}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/white-circle.png", "start": 43457845, "end": 43460536}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/white-heart.png", "start": 43460536, "end": 43463632}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/white-square.png", "start": 43463632, "end": 43464433}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/wood.png", "start": 43464433, "end": 43467894}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/wrench.png", "start": 43467894, "end": 43471447}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/yawning.png", "start": 43471447, "end": 43476541}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/yellow-circle.png", "start": 43476541, "end": 43479434}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/yellow-heart.png", "start": 43479434, "end": 43482770}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/yellow-square.png", "start": 43482770, "end": 43483667}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/yellow.png", "start": 43483667, "end": 43486560}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe/zero.png", "start": 43486560, "end": 43488916}, {"filename": "/packages/mettagrid/nim/mettascope/data/vibe_bindings.json", "start": 43488916, "end": 43488983}, {"filename": "/packages/mettagrid/nim/mettascope/data/view/fog.png", "start": 43488983, "end": 43489196}, {"filename": "/packages/mettagrid/nim/mettascope/data/view/grid.png", "start": 43489196, "end": 43489423}, {"filename": "/packages/mettagrid/nim/mettascope/data/view/grid10.png", "start": 43489423, "end": 43492919}, {"filename": "/packages/mettagrid/nim/mettascope/data/white.png", "start": 43492919, "end": 43493132}], "remote_package_size": 43493132});

  })();


    // All the pre-js content up to here must remain later on, we need to run
    // it.
    if (Module['ENVIRONMENT_IS_PTHREAD'] || Module['$ww']) Module['preRun'] = [];
    var necessaryPreJSTasks = Module['preRun'].slice();
  
    if (!Module['preRun']) throw 'Module.preRun should exist because file support used it; did a pre-js delete it?';
    necessaryPreJSTasks.forEach(function(task) {
      if (Module['preRun'].indexOf(task) < 0) throw 'All preRun tasks that exist before user pre-js code should remain after; did you replace Module or modify Module.preRun?';
    });
  

// Sometimes an existing Module object exists with properties
// meant to overwrite the default module functionality. Here
// we collect those properties and reapply _after_ we configure
// the current environment's defaults to avoid having to be so
// defensive during initialization.
var moduleOverrides = Object.assign({}, Module);

var arguments_ = [];
var thisProgram = './this.program';
var quit_ = (status, toThrow) => {
  throw toThrow;
};

// Determine the runtime environment we are in. You can customize this by
// setting the ENVIRONMENT setting at compile time (see settings.js).

// Attempt to auto-detect the environment
var ENVIRONMENT_IS_WEB = typeof window == 'object';
var ENVIRONMENT_IS_WORKER = typeof importScripts == 'function';
// N.b. Electron.js environment is simultaneously a NODE-environment, but
// also a web environment.
var ENVIRONMENT_IS_NODE = typeof process == 'object' && typeof process.versions == 'object' && typeof process.versions.node == 'string';
var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;

if (Module['ENVIRONMENT']) {
  throw new Error('Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)');
}

// `/` should be present at the end if `scriptDirectory` is not empty
var scriptDirectory = '';
function locateFile(path) {
  if (Module['locateFile']) {
    return Module['locateFile'](path, scriptDirectory);
  }
  return scriptDirectory + path;
}

// Hooks that are implemented differently in different runtime environments.
var read_,
    readAsync,
    readBinary;

if (ENVIRONMENT_IS_NODE) {
  if (typeof process == 'undefined' || !process.release || process.release.name !== 'node') throw new Error('not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)');

  var nodeVersion = process.versions.node;
  var numericVersion = nodeVersion.split('.').slice(0, 3);
  numericVersion = (numericVersion[0] * 10000) + (numericVersion[1] * 100) + (numericVersion[2].split('-')[0] * 1);
  var minVersion = 160000;
  if (numericVersion < 160000) {
    throw new Error('This emscripten-generated code requires node v16.0.0 (detected v' + nodeVersion + ')');
  }

  // `require()` is no-op in an ESM module, use `createRequire()` to construct
  // the require()` function.  This is only necessary for multi-environment
  // builds, `-sENVIRONMENT=node` emits a static import declaration instead.
  // TODO: Swap all `require()`'s with `import()`'s?
  // These modules will usually be used on Node.js. Load them eagerly to avoid
  // the complexity of lazy-loading.
  var fs = require('fs');
  var nodePath = require('path');

  if (ENVIRONMENT_IS_WORKER) {
    scriptDirectory = nodePath.dirname(scriptDirectory) + '/';
  } else {
    scriptDirectory = __dirname + '/';
  }

// include: node_shell_read.js
read_ = (filename, binary) => {
  // We need to re-wrap `file://` strings to URLs. Normalizing isn't
  // necessary in that case, the path should already be absolute.
  filename = isFileURI(filename) ? new URL(filename) : nodePath.normalize(filename);
  return fs.readFileSync(filename, binary ? undefined : 'utf8');
};

readBinary = (filename) => {
  var ret = read_(filename, true);
  if (!ret.buffer) {
    ret = new Uint8Array(ret);
  }
  assert(ret.buffer);
  return ret;
};

readAsync = (filename, onload, onerror, binary = true) => {
  // See the comment in the `read_` function.
  filename = isFileURI(filename) ? new URL(filename) : nodePath.normalize(filename);
  fs.readFile(filename, binary ? undefined : 'utf8', (err, data) => {
    if (err) onerror(err);
    else onload(binary ? data.buffer : data);
  });
};
// end include: node_shell_read.js
  if (!Module['thisProgram'] && process.argv.length > 1) {
    thisProgram = process.argv[1].replace(/\\/g, '/');
  }

  arguments_ = process.argv.slice(2);

  if (typeof module != 'undefined') {
    module['exports'] = Module;
  }

  process.on('uncaughtException', (ex) => {
    // suppress ExitStatus exceptions from showing an error
    if (ex !== 'unwind' && !(ex instanceof ExitStatus) && !(ex.context instanceof ExitStatus)) {
      throw ex;
    }
  });

  quit_ = (status, toThrow) => {
    process.exitCode = status;
    throw toThrow;
  };

} else
if (ENVIRONMENT_IS_SHELL) {

  if ((typeof process == 'object' && typeof require === 'function') || typeof window == 'object' || typeof importScripts == 'function') throw new Error('not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)');

  if (typeof read != 'undefined') {
    read_ = read;
  }

  readBinary = (f) => {
    if (typeof readbuffer == 'function') {
      return new Uint8Array(readbuffer(f));
    }
    let data = read(f, 'binary');
    assert(typeof data == 'object');
    return data;
  };

  readAsync = (f, onload, onerror) => {
    setTimeout(() => onload(readBinary(f)));
  };

  if (typeof clearTimeout == 'undefined') {
    globalThis.clearTimeout = (id) => {};
  }

  if (typeof setTimeout == 'undefined') {
    // spidermonkey lacks setTimeout but we use it above in readAsync.
    globalThis.setTimeout = (f) => (typeof f == 'function') ? f() : abort();
  }

  if (typeof scriptArgs != 'undefined') {
    arguments_ = scriptArgs;
  } else if (typeof arguments != 'undefined') {
    arguments_ = arguments;
  }

  if (typeof quit == 'function') {
    quit_ = (status, toThrow) => {
      // Unlike node which has process.exitCode, d8 has no such mechanism. So we
      // have no way to set the exit code and then let the program exit with
      // that code when it naturally stops running (say, when all setTimeouts
      // have completed). For that reason, we must call `quit` - the only way to
      // set the exit code - but quit also halts immediately.  To increase
      // consistency with node (and the web) we schedule the actual quit call
      // using a setTimeout to give the current stack and any exception handlers
      // a chance to run.  This enables features such as addOnPostRun (which
      // expected to be able to run code after main returns).
      setTimeout(() => {
        if (!(toThrow instanceof ExitStatus)) {
          let toLog = toThrow;
          if (toThrow && typeof toThrow == 'object' && toThrow.stack) {
            toLog = [toThrow, toThrow.stack];
          }
          err(`exiting due to exception: ${toLog}`);
        }
        quit(status);
      });
      throw toThrow;
    };
  }

  if (typeof print != 'undefined') {
    // Prefer to use print/printErr where they exist, as they usually work better.
    if (typeof console == 'undefined') console = /** @type{!Console} */({});
    console.log = /** @type{!function(this:Console, ...*): undefined} */ (print);
    console.warn = console.error = /** @type{!function(this:Console, ...*): undefined} */ (typeof printErr != 'undefined' ? printErr : print);
  }

} else

// Note that this includes Node.js workers when relevant (pthreads is enabled).
// Node.js workers are detected as a combination of ENVIRONMENT_IS_WORKER and
// ENVIRONMENT_IS_NODE.
if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  if (ENVIRONMENT_IS_WORKER) { // Check worker, not web, since window could be polyfilled
    scriptDirectory = self.location.href;
  } else if (typeof document != 'undefined' && document.currentScript) { // web
    scriptDirectory = document.currentScript.src;
  }
  // blob urls look like blob:http://site.com/etc/etc and we cannot infer anything from them.
  // otherwise, slice off the final part of the url to find the script directory.
  // if scriptDirectory does not contain a slash, lastIndexOf will return -1,
  // and scriptDirectory will correctly be replaced with an empty string.
  // If scriptDirectory contains a query (starting with ?) or a fragment (starting with #),
  // they are removed because they could contain a slash.
  if (scriptDirectory.startsWith('blob:')) {
    scriptDirectory = '';
  } else {
    scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, '').lastIndexOf('/')+1);
  }

  if (!(typeof window == 'object' || typeof importScripts == 'function')) throw new Error('not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)');

  // Differentiate the Web Worker from the Node Worker case, as reading must
  // be done differently.
  {
// include: web_or_worker_shell_read.js
read_ = (url) => {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send(null);
    return xhr.responseText;
  }

  if (ENVIRONMENT_IS_WORKER) {
    readBinary = (url) => {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, false);
      xhr.responseType = 'arraybuffer';
      xhr.send(null);
      return new Uint8Array(/** @type{!ArrayBuffer} */(xhr.response));
    };
  }

  readAsync = (url, onload, onerror) => {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = () => {
      if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
        onload(xhr.response);
        return;
      }
      onerror();
    };
    xhr.onerror = onerror;
    xhr.send(null);
  }

// end include: web_or_worker_shell_read.js
  }
} else
{
  throw new Error('environment detection error');
}

var out = Module['print'] || console.log.bind(console);
var err = Module['printErr'] || console.error.bind(console);

// Merge back in the overrides
Object.assign(Module, moduleOverrides);
// Free the object hierarchy contained in the overrides, this lets the GC
// reclaim data used e.g. in memoryInitializerRequest, which is a large typed array.
moduleOverrides = null;
checkIncomingModuleAPI();

// Emit code to handle expected values on the Module object. This applies Module.x
// to the proper local x. This has two benefits: first, we only emit it if it is
// expected to arrive, and second, by using a local everywhere else that can be
// minified.

if (Module['arguments']) arguments_ = Module['arguments'];legacyModuleProp('arguments', 'arguments_');

if (Module['thisProgram']) thisProgram = Module['thisProgram'];legacyModuleProp('thisProgram', 'thisProgram');

if (Module['quit']) quit_ = Module['quit'];legacyModuleProp('quit', 'quit_');

// perform assertions in shell.js after we set up out() and err(), as otherwise if an assertion fails it cannot print the message
// Assertions on removed incoming Module JS APIs.
assert(typeof Module['memoryInitializerPrefixURL'] == 'undefined', 'Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['pthreadMainPrefixURL'] == 'undefined', 'Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['cdInitializerPrefixURL'] == 'undefined', 'Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['filePackagePrefixURL'] == 'undefined', 'Module.filePackagePrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['read'] == 'undefined', 'Module.read option was removed (modify read_ in JS)');
assert(typeof Module['readAsync'] == 'undefined', 'Module.readAsync option was removed (modify readAsync in JS)');
assert(typeof Module['readBinary'] == 'undefined', 'Module.readBinary option was removed (modify readBinary in JS)');
assert(typeof Module['setWindowTitle'] == 'undefined', 'Module.setWindowTitle option was removed (modify emscripten_set_window_title in JS)');
assert(typeof Module['TOTAL_MEMORY'] == 'undefined', 'Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY');
legacyModuleProp('asm', 'wasmExports');
legacyModuleProp('read', 'read_');
legacyModuleProp('readAsync', 'readAsync');
legacyModuleProp('readBinary', 'readBinary');
legacyModuleProp('setWindowTitle', 'setWindowTitle');
var IDBFS = 'IDBFS is no longer included by default; build with -lidbfs.js';
var PROXYFS = 'PROXYFS is no longer included by default; build with -lproxyfs.js';
var WORKERFS = 'WORKERFS is no longer included by default; build with -lworkerfs.js';
var FETCHFS = 'FETCHFS is no longer included by default; build with -lfetchfs.js';
var ICASEFS = 'ICASEFS is no longer included by default; build with -licasefs.js';
var JSFILEFS = 'JSFILEFS is no longer included by default; build with -ljsfilefs.js';
var OPFS = 'OPFS is no longer included by default; build with -lopfs.js';

var NODEFS = 'NODEFS is no longer included by default; build with -lnodefs.js';

assert(!ENVIRONMENT_IS_SHELL, 'shell environment detected but not enabled at build time.  Add `shell` to `-sENVIRONMENT` to enable.');


// end include: shell.js
// include: preamble.js
// === Preamble library stuff ===

// Documentation for the public APIs defined in this file must be updated in:
//    site/source/docs/api_reference/preamble.js.rst
// A prebuilt local version of the documentation is available at:
//    site/build/text/docs/api_reference/preamble.js.txt
// You can also build docs locally as HTML or other formats in site/
// An online HTML version (which may be of a different version of Emscripten)
//    is up at http://kripken.github.io/emscripten-site/docs/api_reference/preamble.js.html

var wasmBinary; 
if (Module['wasmBinary']) wasmBinary = Module['wasmBinary'];legacyModuleProp('wasmBinary', 'wasmBinary');

if (typeof WebAssembly != 'object') {
  abort('no native wasm support detected');
}

// include: base64Utils.js
// Converts a string of base64 into a byte array (Uint8Array).
function intArrayFromBase64(s) {
  if (typeof ENVIRONMENT_IS_NODE != 'undefined' && ENVIRONMENT_IS_NODE) {
    var buf = Buffer.from(s, 'base64');
    return new Uint8Array(buf.buffer, buf.byteOffset, buf.length);
  }

  var decoded = atob(s);
  var bytes = new Uint8Array(decoded.length);
  for (var i = 0 ; i < decoded.length ; ++i) {
    bytes[i] = decoded.charCodeAt(i);
  }
  return bytes;
}

// If filename is a base64 data URI, parses and returns data (Buffer on node,
// Uint8Array otherwise). If filename is not a base64 data URI, returns undefined.
function tryParseAsDataURI(filename) {
  if (!isDataURI(filename)) {
    return;
  }

  return intArrayFromBase64(filename.slice(dataURIPrefix.length));
}
// end include: base64Utils.js
// Wasm globals

var wasmMemory;

//========================================
// Runtime essentials
//========================================

// whether we are quitting the application. no code should run after this.
// set in exit() and abort()
var ABORT = false;

// set by exit() and abort().  Passed to 'onExit' handler.
// NOTE: This is also used as the process return code code in shell environments
// but only when noExitRuntime is false.
var EXITSTATUS;

// In STRICT mode, we only define assert() when ASSERTIONS is set.  i.e. we
// don't define it at all in release modes.  This matches the behaviour of
// MINIMAL_RUNTIME.
// TODO(sbc): Make this the default even without STRICT enabled.
/** @type {function(*, string=)} */
function assert(condition, text) {
  if (!condition) {
    abort('Assertion failed' + (text ? ': ' + text : ''));
  }
}

// We used to include malloc/free by default in the past. Show a helpful error in
// builds with assertions.

// Memory management

var HEAP,
/** @type {!Int8Array} */
  HEAP8,
/** @type {!Uint8Array} */
  HEAPU8,
/** @type {!Int16Array} */
  HEAP16,
/** @type {!Uint16Array} */
  HEAPU16,
/** @type {!Int32Array} */
  HEAP32,
/** @type {!Uint32Array} */
  HEAPU32,
/** @type {!Float32Array} */
  HEAPF32,
/** @type {!Float64Array} */
  HEAPF64;

function updateMemoryViews() {
  var b = wasmMemory.buffer;
  Module['HEAP8'] = HEAP8 = new Int8Array(b);
  Module['HEAP16'] = HEAP16 = new Int16Array(b);
  Module['HEAPU8'] = HEAPU8 = new Uint8Array(b);
  Module['HEAPU16'] = HEAPU16 = new Uint16Array(b);
  Module['HEAP32'] = HEAP32 = new Int32Array(b);
  Module['HEAPU32'] = HEAPU32 = new Uint32Array(b);
  Module['HEAPF32'] = HEAPF32 = new Float32Array(b);
  Module['HEAPF64'] = HEAPF64 = new Float64Array(b);
}

assert(!Module['STACK_SIZE'], 'STACK_SIZE can no longer be set at runtime.  Use -sSTACK_SIZE at link time')

assert(typeof Int32Array != 'undefined' && typeof Float64Array !== 'undefined' && Int32Array.prototype.subarray != undefined && Int32Array.prototype.set != undefined,
       'JS engine does not provide full typed array support');

// If memory is defined in wasm, the user can't provide it, or set INITIAL_MEMORY
assert(!Module['wasmMemory'], 'Use of `wasmMemory` detected.  Use -sIMPORTED_MEMORY to define wasmMemory externally');
assert(!Module['INITIAL_MEMORY'], 'Detected runtime INITIAL_MEMORY setting.  Use -sIMPORTED_MEMORY to define wasmMemory dynamically');

// include: runtime_stack_check.js
// Initializes the stack cookie. Called at the startup of main and at the startup of each thread in pthreads mode.
function writeStackCookie() {
  var max = _emscripten_stack_get_end();
  assert((max & 3) == 0);
  // If the stack ends at address zero we write our cookies 4 bytes into the
  // stack.  This prevents interference with SAFE_HEAP and ASAN which also
  // monitor writes to address zero.
  if (max == 0) {
    max += 4;
  }
  // The stack grow downwards towards _emscripten_stack_get_end.
  // We write cookies to the final two words in the stack and detect if they are
  // ever overwritten.
  HEAPU32[((max)>>2)] = 0x02135467;
  HEAPU32[(((max)+(4))>>2)] = 0x89BACDFE;
  // Also test the global address 0 for integrity.
  HEAPU32[((0)>>2)] = 1668509029;
}

function checkStackCookie() {
  if (ABORT) return;
  var max = _emscripten_stack_get_end();
  // See writeStackCookie().
  if (max == 0) {
    max += 4;
  }
  var cookie1 = HEAPU32[((max)>>2)];
  var cookie2 = HEAPU32[(((max)+(4))>>2)];
  if (cookie1 != 0x02135467 || cookie2 != 0x89BACDFE) {
    abort(`Stack overflow! Stack cookie has been overwritten at ${ptrToString(max)}, expected hex dwords 0x89BACDFE and 0x2135467, but received ${ptrToString(cookie2)} ${ptrToString(cookie1)}`);
  }
  // Also test the global address 0 for integrity.
  if (HEAPU32[((0)>>2)] != 0x63736d65 /* 'emsc' */) {
    abort('Runtime error: The application has corrupted its heap memory area (address zero)!');
  }
}
// end include: runtime_stack_check.js
// include: runtime_assertions.js
// Endianness check
(function() {
  var h16 = new Int16Array(1);
  var h8 = new Int8Array(h16.buffer);
  h16[0] = 0x6373;
  if (h8[0] !== 0x73 || h8[1] !== 0x63) throw 'Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)';
})();

// end include: runtime_assertions.js
var __ATPRERUN__  = []; // functions called before the runtime is initialized
var __ATINIT__    = []; // functions called during startup
var __ATMAIN__    = []; // functions called when main() is to be run
var __ATEXIT__    = []; // functions called during shutdown
var __ATPOSTRUN__ = []; // functions called after the main() is called

var runtimeInitialized = false;

function preRun() {
  if (Module['preRun']) {
    if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
    while (Module['preRun'].length) {
      addOnPreRun(Module['preRun'].shift());
    }
  }
  callRuntimeCallbacks(__ATPRERUN__);
}

function initRuntime() {
  assert(!runtimeInitialized);
  runtimeInitialized = true;

  checkStackCookie();

  
if (!Module['noFSInit'] && !FS.init.initialized)
  FS.init();
FS.ignorePermissions = false;

TTY.init();
  callRuntimeCallbacks(__ATINIT__);
}

function preMain() {
  checkStackCookie();
  
  callRuntimeCallbacks(__ATMAIN__);
}

function postRun() {
  checkStackCookie();

  if (Module['postRun']) {
    if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];
    while (Module['postRun'].length) {
      addOnPostRun(Module['postRun'].shift());
    }
  }

  callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
  __ATPRERUN__.unshift(cb);
}

function addOnInit(cb) {
  __ATINIT__.unshift(cb);
}

function addOnPreMain(cb) {
  __ATMAIN__.unshift(cb);
}

function addOnExit(cb) {
}

function addOnPostRun(cb) {
  __ATPOSTRUN__.unshift(cb);
}

// include: runtime_math.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/fround

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/clz32

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc

assert(Math.imul, 'This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.fround, 'This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.clz32, 'This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.trunc, 'This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
// end include: runtime_math.js
// A counter of dependencies for calling run(). If we need to
// do asynchronous work before running, increment this and
// decrement it. Incrementing must happen in a place like
// Module.preRun (used by emcc to add file preloading).
// Note that you can add dependencies in preRun, even though
// it happens right before run - run will be postponed until
// the dependencies are met.
var runDependencies = 0;
var runDependencyWatcher = null;
var dependenciesFulfilled = null; // overridden to take different actions when all run dependencies are fulfilled
var runDependencyTracking = {};

function getUniqueRunDependency(id) {
  var orig = id;
  while (1) {
    if (!runDependencyTracking[id]) return id;
    id = orig + Math.random();
  }
}

function addRunDependency(id) {
  runDependencies++;

  Module['monitorRunDependencies']?.(runDependencies);

  if (id) {
    assert(!runDependencyTracking[id]);
    runDependencyTracking[id] = 1;
    if (runDependencyWatcher === null && typeof setInterval != 'undefined') {
      // Check for missing dependencies every few seconds
      runDependencyWatcher = setInterval(() => {
        if (ABORT) {
          clearInterval(runDependencyWatcher);
          runDependencyWatcher = null;
          return;
        }
        var shown = false;
        for (var dep in runDependencyTracking) {
          if (!shown) {
            shown = true;
            err('still waiting on run dependencies:');
          }
          err(`dependency: ${dep}`);
        }
        if (shown) {
          err('(end of list)');
        }
      }, 10000);
    }
  } else {
    err('warning: run dependency added without ID');
  }
}

function removeRunDependency(id) {
  runDependencies--;

  Module['monitorRunDependencies']?.(runDependencies);

  if (id) {
    assert(runDependencyTracking[id]);
    delete runDependencyTracking[id];
  } else {
    err('warning: run dependency removed without ID');
  }
  if (runDependencies == 0) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher);
      runDependencyWatcher = null;
    }
    if (dependenciesFulfilled) {
      var callback = dependenciesFulfilled;
      dependenciesFulfilled = null;
      callback(); // can add another dependenciesFulfilled
    }
  }
}

/** @param {string|number=} what */
function abort(what) {
  Module['onAbort']?.(what);

  what = 'Aborted(' + what + ')';
  // TODO(sbc): Should we remove printing and leave it up to whoever
  // catches the exception?
  err(what);

  ABORT = true;
  EXITSTATUS = 1;

  if (what.indexOf('RuntimeError: unreachable') >= 0) {
    what += '. "unreachable" may be due to ASYNCIFY_STACK_SIZE not being large enough (try increasing it)';
  }

  // Use a wasm runtime error, because a JS error might be seen as a foreign
  // exception, which means we'd run destructors on it. We need the error to
  // simply make the program stop.
  // FIXME This approach does not work in Wasm EH because it currently does not assume
  // all RuntimeErrors are from traps; it decides whether a RuntimeError is from
  // a trap or not based on a hidden field within the object. So at the moment
  // we don't have a way of throwing a wasm trap from JS. TODO Make a JS API that
  // allows this in the wasm spec.

  // Suppress closure compiler warning here. Closure compiler's builtin extern
  // defintion for WebAssembly.RuntimeError claims it takes no arguments even
  // though it can.
  // TODO(https://github.com/google/closure-compiler/pull/3913): Remove if/when upstream closure gets fixed.
  /** @suppress {checkTypes} */
  var e = new WebAssembly.RuntimeError(what);

  // Throw the error whether or not MODULARIZE is set because abort is used
  // in code paths apart from instantiation where an exception is expected
  // to be thrown when abort is called.
  throw e;
}

// include: memoryprofiler.js
// end include: memoryprofiler.js
// include: URIUtils.js
// Prefix of data URIs emitted by SINGLE_FILE and related options.
var dataURIPrefix = 'data:application/octet-stream;base64,';

/**
 * Indicates whether filename is a base64 data URI.
 * @noinline
 */
var isDataURI = (filename) => filename.startsWith(dataURIPrefix);

/**
 * Indicates whether filename is delivered via file protocol (as opposed to http/https)
 * @noinline
 */
var isFileURI = (filename) => filename.startsWith('file://');
// end include: URIUtils.js
function createExportWrapper(name) {
  return (...args) => {
    assert(runtimeInitialized, `native function \`${name}\` called before runtime initialization`);
    var f = wasmExports[name];
    assert(f, `exported native function \`${name}\` not found`);
    return f(...args);
  };
}

// include: runtime_exceptions.js
// end include: runtime_exceptions.js
var wasmBinaryFile;
  wasmBinaryFile = 'mettascope.wasm';
  if (!isDataURI(wasmBinaryFile)) {
    wasmBinaryFile = locateFile(wasmBinaryFile);
  }

function getBinarySync(file) {
  if (file == wasmBinaryFile && wasmBinary) {
    return new Uint8Array(wasmBinary);
  }
  if (readBinary) {
    return readBinary(file);
  }
  throw 'both async and sync fetching of the wasm failed';
}

function getBinaryPromise(binaryFile) {
  // If we don't have the binary yet, try to load it asynchronously.
  // Fetch has some additional restrictions over XHR, like it can't be used on a file:// url.
  // See https://github.com/github/fetch/pull/92#issuecomment-140665932
  // Cordova or Electron apps are typically loaded from a file:// url.
  // So use fetch if it is available and the url is not a file, otherwise fall back to XHR.
  if (!wasmBinary
      && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) {
    if (typeof fetch == 'function'
      && !isFileURI(binaryFile)
    ) {
      return fetch(binaryFile, { credentials: 'same-origin' }).then((response) => {
        if (!response['ok']) {
          throw `failed to load wasm binary file at '${binaryFile}'`;
        }
        return response['arrayBuffer']();
      }).catch(() => getBinarySync(binaryFile));
    }
    else if (readAsync) {
      // fetch is not available or url is file => try XHR (readAsync uses XHR internally)
      return new Promise((resolve, reject) => {
        readAsync(binaryFile, (response) => resolve(new Uint8Array(/** @type{!ArrayBuffer} */(response))), reject)
      });
    }
  }

  // Otherwise, getBinarySync should be able to get it synchronously
  return Promise.resolve().then(() => getBinarySync(binaryFile));
}

function instantiateArrayBuffer(binaryFile, imports, receiver) {
  return getBinaryPromise(binaryFile).then((binary) => {
    return WebAssembly.instantiate(binary, imports);
  }).then(receiver, (reason) => {
    err(`failed to asynchronously prepare wasm: ${reason}`);

    // Warn on some common problems.
    if (isFileURI(wasmBinaryFile)) {
      err(`warning: Loading from a file URI (${wasmBinaryFile}) is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing`);
    }
    abort(reason);
  });
}

function instantiateAsync(binary, binaryFile, imports, callback) {
  if (!binary &&
      typeof WebAssembly.instantiateStreaming == 'function' &&
      !isDataURI(binaryFile) &&
      // Don't use streaming for file:// delivered objects in a webview, fetch them synchronously.
      !isFileURI(binaryFile) &&
      // Avoid instantiateStreaming() on Node.js environment for now, as while
      // Node.js v18.1.0 implements it, it does not have a full fetch()
      // implementation yet.
      //
      // Reference:
      //   https://github.com/emscripten-core/emscripten/pull/16917
      !ENVIRONMENT_IS_NODE &&
      typeof fetch == 'function') {
    return fetch(binaryFile, { credentials: 'same-origin' }).then((response) => {
      // Suppress closure warning here since the upstream definition for
      // instantiateStreaming only allows Promise<Repsponse> rather than
      // an actual Response.
      // TODO(https://github.com/google/closure-compiler/pull/3913): Remove if/when upstream closure is fixed.
      /** @suppress {checkTypes} */
      var result = WebAssembly.instantiateStreaming(response, imports);

      return result.then(
        callback,
        function(reason) {
          // We expect the most common failure cause to be a bad MIME type for the binary,
          // in which case falling back to ArrayBuffer instantiation should work.
          err(`wasm streaming compile failed: ${reason}`);
          err('falling back to ArrayBuffer instantiation');
          return instantiateArrayBuffer(binaryFile, imports, callback);
        });
    });
  }
  return instantiateArrayBuffer(binaryFile, imports, callback);
}

// Create the wasm instance.
// Receives the wasm imports, returns the exports.
function createWasm() {
  // prepare imports
  var info = {
    'env': wasmImports,
    'wasi_snapshot_preview1': wasmImports,
  };
  // Load the wasm module and create an instance of using native support in the JS engine.
  // handle a generated wasm instance, receiving its exports and
  // performing other necessary setup
  /** @param {WebAssembly.Module=} module*/
  function receiveInstance(instance, module) {
    wasmExports = instance.exports;

    wasmExports = Asyncify.instrumentWasmExports(wasmExports);

    

    wasmMemory = wasmExports['memory'];
    
    assert(wasmMemory, 'memory not found in wasm exports');
    // This assertion doesn't hold when emscripten is run in --post-link
    // mode.
    // TODO(sbc): Read INITIAL_MEMORY out of the wasm file in post-link mode.
    //assert(wasmMemory.buffer.byteLength === 16777216);
    updateMemoryViews();

    addOnInit(wasmExports['__wasm_call_ctors']);

    removeRunDependency('wasm-instantiate');
    return wasmExports;
  }
  // wait for the pthread pool (if any)
  addRunDependency('wasm-instantiate');

  // Prefer streaming instantiation if available.
  // Async compilation can be confusing when an error on the page overwrites Module
  // (for example, if the order of elements is wrong, and the one defining Module is
  // later), so we save Module and check it later.
  var trueModule = Module;
  function receiveInstantiationResult(result) {
    // 'result' is a ResultObject object which has both the module and instance.
    // receiveInstance() will swap in the exports (to Module.asm) so they can be called
    assert(Module === trueModule, 'the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?');
    trueModule = null;
    // TODO: Due to Closure regression https://github.com/google/closure-compiler/issues/3193, the above line no longer optimizes out down to the following line.
    // When the regression is fixed, can restore the above PTHREADS-enabled path.
    receiveInstance(result['instance']);
  }

  // User shell pages can write their own Module.instantiateWasm = function(imports, successCallback) callback
  // to manually instantiate the Wasm module themselves. This allows pages to
  // run the instantiation parallel to any other async startup actions they are
  // performing.
  // Also pthreads and wasm workers initialize the wasm instance through this
  // path.
  if (Module['instantiateWasm']) {

    try {
      return Module['instantiateWasm'](info, receiveInstance);
    } catch(e) {
      err(`Module.instantiateWasm callback failed with error: ${e}`);
        return false;
    }
  }

  instantiateAsync(wasmBinary, wasmBinaryFile, info, receiveInstantiationResult);
  return {}; // no exports yet; we'll fill them in later
}

// Globals used by JS i64 conversions (see makeSetValue)
var tempDouble;
var tempI64;

// include: runtime_debug.js
function legacyModuleProp(prop, newName, incomming=true) {
  if (!Object.getOwnPropertyDescriptor(Module, prop)) {
    Object.defineProperty(Module, prop, {
      configurable: true,
      get() {
        let extra = incomming ? ' (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)' : '';
        abort(`\`Module.${prop}\` has been replaced by \`${newName}\`` + extra);

      }
    });
  }
}

function ignoredModuleProp(prop) {
  if (Object.getOwnPropertyDescriptor(Module, prop)) {
    abort(`\`Module.${prop}\` was supplied but \`${prop}\` not included in INCOMING_MODULE_JS_API`);
  }
}

// forcing the filesystem exports a few things by default
function isExportedByForceFilesystem(name) {
  return name === 'FS_createPath' ||
         name === 'FS_createDataFile' ||
         name === 'FS_createPreloadedFile' ||
         name === 'FS_unlink' ||
         name === 'addRunDependency' ||
         // The old FS has some functionality that WasmFS lacks.
         name === 'FS_createLazyFile' ||
         name === 'FS_createDevice' ||
         name === 'removeRunDependency';
}

function missingGlobal(sym, msg) {
  if (typeof globalThis !== 'undefined') {
    Object.defineProperty(globalThis, sym, {
      configurable: true,
      get() {
        warnOnce(`\`${sym}\` is not longer defined by emscripten. ${msg}`);
        return undefined;
      }
    });
  }
}

missingGlobal('buffer', 'Please use HEAP8.buffer or wasmMemory.buffer');
missingGlobal('asm', 'Please use wasmExports instead');

function missingLibrarySymbol(sym) {
  if (typeof globalThis !== 'undefined' && !Object.getOwnPropertyDescriptor(globalThis, sym)) {
    Object.defineProperty(globalThis, sym, {
      configurable: true,
      get() {
        // Can't `abort()` here because it would break code that does runtime
        // checks.  e.g. `if (typeof SDL === 'undefined')`.
        var msg = `\`${sym}\` is a library symbol and not included by default; add it to your library.js __deps or to DEFAULT_LIBRARY_FUNCS_TO_INCLUDE on the command line`;
        // DEFAULT_LIBRARY_FUNCS_TO_INCLUDE requires the name as it appears in
        // library.js, which means $name for a JS name with no prefix, or name
        // for a JS name like _name.
        var librarySymbol = sym;
        if (!librarySymbol.startsWith('_')) {
          librarySymbol = '$' + sym;
        }
        msg += ` (e.g. -sDEFAULT_LIBRARY_FUNCS_TO_INCLUDE='${librarySymbol}')`;
        if (isExportedByForceFilesystem(sym)) {
          msg += '. Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you';
        }
        warnOnce(msg);
        return undefined;
      }
    });
  }
  // Any symbol that is not included from the JS libary is also (by definition)
  // not exported on the Module object.
  unexportedRuntimeSymbol(sym);
}

function unexportedRuntimeSymbol(sym) {
  if (!Object.getOwnPropertyDescriptor(Module, sym)) {
    Object.defineProperty(Module, sym, {
      configurable: true,
      get() {
        var msg = `'${sym}' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the Emscripten FAQ)`;
        if (isExportedByForceFilesystem(sym)) {
          msg += '. Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you';
        }
        abort(msg);
      }
    });
  }
}

// Used by XXXXX_DEBUG settings to output debug messages.
function dbg(...args) {
  // TODO(sbc): Make this configurable somehow.  Its not always convenient for
  // logging to show up as warnings.
  console.warn(...args);
}
// end include: runtime_debug.js
// === Body ===

function get_window_width() { return window.innerWidth; }
function get_window_height() { return window.innerHeight; }
function get_canvas_width() { return Module.canvas.width; }
function get_canvas_height() { return Module.canvas.height; }
function set_canvas_size(width,height) { Module.canvas.width = width; Module.canvas.height = height; Module.canvas.style.width = "100%"; Module.canvas.style.height = "100%"; }
function make_canvas_focusable() { Module.canvas.tabIndex = 1; Module.canvas.focus(); }
function set_document_title(title) { document.title = UTF8ToString(title); }
function get_window_url_length() { if (typeof location === 'undefined' || typeof location.href === 'undefined') return 1; var s = location.href; return lengthBytesUTF8(s) + 1; }
function get_window_url_into(output,maxLen) { var s = (typeof location !== 'undefined' && typeof location.href !== 'undefined') ? location.href : ""; return stringToUTF8(s, output, maxLen); }
function get_device_pixel_ratio() { return window.devicePixelRatio || 1.0; }
function open_temp_text_file(title,text) { const win = window.open('', '_blank'); if (!win) { console.error("Popup blocked"); return; } const titleUtf8 = UTF8ToString(title); const textUtf8 = UTF8ToString(text); win.document.title = titleUtf8; const pre = win.document.createElement('pre'); pre.innerText = textUtf8; win.document.body.appendChild(pre); }
function open_url(url) { const urlUtf8 = UTF8ToString(url); window.open(urlUtf8, '_blank'); }
function setup_drag_drop_handlers_internal(target,userData) { const canvas = target ? document.querySelector(UTF8ToString(target)) : Module.canvas; if (!canvas) { console.error("Canvas not found for drag and drop setup"); return; } canvas.addEventListener('dragenter', function(e) { e.preventDefault(); e.stopPropagation(); }, false); canvas.addEventListener('dragover', function(e) { e.preventDefault(); e.stopPropagation(); }, false); canvas.addEventListener('dragleave', function(e) { e.preventDefault(); e.stopPropagation(); }, false); canvas.addEventListener('drop', function(e) { e.preventDefault(); e.stopPropagation(); if (!e.dataTransfer || !e.dataTransfer.files || e.dataTransfer.files.length === 0) { return; } for (let i = 0; i < e.dataTransfer.files.length; i++) { const file = e.dataTransfer.files[i]; const reader = new FileReader(); reader.onload = function(evt) { if (evt.target.readyState !== FileReader.DONE) return; const arrayBuffer = evt.target.result; const uint8Array = new Uint8Array(arrayBuffer); const fileNameLen = lengthBytesUTF8(file.name) + 1; const fileNamePtr = _malloc(fileNameLen); stringToUTF8(file.name, fileNamePtr, fileNameLen); const fileDataLen = uint8Array.length; const fileDataPtr = _malloc(fileDataLen); HEAPU8.set(uint8Array, fileDataPtr); Module._windy_file_drop_callback(userData, fileNamePtr, fileDataPtr, fileDataLen); _free(fileNamePtr); _free(fileDataPtr); }; reader.readAsArrayBuffer(file); } }, false); }
function set_cursor(cursor) { const cursorUtf8 = UTF8ToString(cursor); Module.canvas.style.cursor = cursorUtf8; }
function get_local_storage_length(key) { const keyUtf8 = UTF8ToString(key); const value = localStorage.getItem(keyUtf8); if (value === null) return 1; return lengthBytesUTF8(value) + 1; }
function get_local_storage_into(output,maxLen,key) { const keyUtf8 = UTF8ToString(key); const value = localStorage.getItem(keyUtf8); if (value === null) { if (maxLen > 0) output[0] = 0; return 1; } return stringToUTF8(value, output, maxLen); }
function set_local_storage(key,value) { const keyUtf8 = UTF8ToString(key); const valueUtf8 = UTF8ToString(value); localStorage.setItem(keyUtf8, valueUtf8); }
function get_platform() { var s = navigator.platform || ""; var len = lengthBytesUTF8(s) + 1; var buf = _malloc(len); stringToUTF8(s, buf, len); return buf; }
function mp_connect_ws_internal(url) { var wsUrl = UTF8ToString(url); console.log('Connecting to ' + wsUrl); window._mpWs = new WebSocket(wsUrl); window._mpWs.onopen = function() { console.log('WebSocket connected'); }; window._mpWs.onmessage = function(e) { var data = e.data; var len = lengthBytesUTF8(data) + 1; var ptr = _malloc(len); stringToUTF8(data, ptr, len); Module._mp_on_message(ptr, len - 1); _free(ptr); }; window._mpWs.onerror = function(e) { console.error('WebSocket error', e); }; window._mpWs.onclose = function() { console.log('WebSocket closed'); }; }
function mp_send_ws_internal(msg) { if (window._mpWs && window._mpWs.readyState === 1) { window._mpWs.send(UTF8ToString(msg)); } }


// end include: preamble.js

  /** @constructor */
  function ExitStatus(status) {
      this.name = 'ExitStatus';
      this.message = `Program terminated with exit(${status})`;
      this.status = status;
    }

  var callRuntimeCallbacks = (callbacks) => {
      while (callbacks.length > 0) {
        // Pass the module as the first argument.
        callbacks.shift()(Module);
      }
    };

  
    /**
     * @param {number} ptr
     * @param {string} type
     */
  function getValue(ptr, type = 'i8') {
    if (type.endsWith('*')) type = '*';
    switch (type) {
      case 'i1': return HEAP8[ptr];
      case 'i8': return HEAP8[ptr];
      case 'i16': return HEAP16[((ptr)>>1)];
      case 'i32': return HEAP32[((ptr)>>2)];
      case 'i64': abort('to do getValue(i64) use WASM_BIGINT');
      case 'float': return HEAPF32[((ptr)>>2)];
      case 'double': return HEAPF64[((ptr)>>3)];
      case '*': return HEAPU32[((ptr)>>2)];
      default: abort(`invalid type for getValue: ${type}`);
    }
  }

  var noExitRuntime = Module['noExitRuntime'] || true;

  var ptrToString = (ptr) => {
      assert(typeof ptr === 'number');
      // With CAN_ADDRESS_2GB or MEMORY64, pointers are already unsigned.
      ptr >>>= 0;
      return '0x' + ptr.toString(16).padStart(8, '0');
    };

  
    /**
     * @param {number} ptr
     * @param {number} value
     * @param {string} type
     */
  function setValue(ptr, value, type = 'i8') {
    if (type.endsWith('*')) type = '*';
    switch (type) {
      case 'i1': HEAP8[ptr] = value; break;
      case 'i8': HEAP8[ptr] = value; break;
      case 'i16': HEAP16[((ptr)>>1)] = value; break;
      case 'i32': HEAP32[((ptr)>>2)] = value; break;
      case 'i64': abort('to do setValue(i64) use WASM_BIGINT');
      case 'float': HEAPF32[((ptr)>>2)] = value; break;
      case 'double': HEAPF64[((ptr)>>3)] = value; break;
      case '*': HEAPU32[((ptr)>>2)] = value; break;
      default: abort(`invalid type for setValue: ${type}`);
    }
  }

  var warnOnce = (text) => {
      warnOnce.shown ||= {};
      if (!warnOnce.shown[text]) {
        warnOnce.shown[text] = 1;
        if (ENVIRONMENT_IS_NODE) text = 'warning: ' + text;
        err(text);
      }
    };

  var UTF8Decoder = typeof TextDecoder != 'undefined' ? new TextDecoder('utf8') : undefined;
  
    /**
     * Given a pointer 'idx' to a null-terminated UTF8-encoded string in the given
     * array that contains uint8 values, returns a copy of that string as a
     * Javascript String object.
     * heapOrArray is either a regular array, or a JavaScript typed array view.
     * @param {number} idx
     * @param {number=} maxBytesToRead
     * @return {string}
     */
  var UTF8ArrayToString = (heapOrArray, idx, maxBytesToRead) => {
      var endIdx = idx + maxBytesToRead;
      var endPtr = idx;
      // TextDecoder needs to know the byte length in advance, it doesn't stop on
      // null terminator by itself.  Also, use the length info to avoid running tiny
      // strings through TextDecoder, since .subarray() allocates garbage.
      // (As a tiny code save trick, compare endPtr against endIdx using a negation,
      // so that undefined means Infinity)
      while (heapOrArray[endPtr] && !(endPtr >= endIdx)) ++endPtr;
  
      if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
        return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
      }
      var str = '';
      // If building with TextDecoder, we have already computed the string length
      // above, so test loop end condition against that
      while (idx < endPtr) {
        // For UTF8 byte structure, see:
        // http://en.wikipedia.org/wiki/UTF-8#Description
        // https://www.ietf.org/rfc/rfc2279.txt
        // https://tools.ietf.org/html/rfc3629
        var u0 = heapOrArray[idx++];
        if (!(u0 & 0x80)) { str += String.fromCharCode(u0); continue; }
        var u1 = heapOrArray[idx++] & 63;
        if ((u0 & 0xE0) == 0xC0) { str += String.fromCharCode(((u0 & 31) << 6) | u1); continue; }
        var u2 = heapOrArray[idx++] & 63;
        if ((u0 & 0xF0) == 0xE0) {
          u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
        } else {
          if ((u0 & 0xF8) != 0xF0) warnOnce('Invalid UTF-8 leading byte ' + ptrToString(u0) + ' encountered when deserializing a UTF-8 string in wasm memory to a JS string!');
          u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (heapOrArray[idx++] & 63);
        }
  
        if (u0 < 0x10000) {
          str += String.fromCharCode(u0);
        } else {
          var ch = u0 - 0x10000;
          str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
        }
      }
      return str;
    };
  
    /**
     * Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the
     * emscripten HEAP, returns a copy of that string as a Javascript String object.
     *
     * @param {number} ptr
     * @param {number=} maxBytesToRead - An optional length that specifies the
     *   maximum number of bytes to read. You can omit this parameter to scan the
     *   string until the first 0 byte. If maxBytesToRead is passed, and the string
     *   at [ptr, ptr+maxBytesToReadr[ contains a null byte in the middle, then the
     *   string will cut short at that byte index (i.e. maxBytesToRead will not
     *   produce a string of exact length [ptr, ptr+maxBytesToRead[) N.B. mixing
     *   frequent uses of UTF8ToString() with and without maxBytesToRead may throw
     *   JS JIT optimizations off, so it is worth to consider consistently using one
     * @return {string}
     */
  var UTF8ToString = (ptr, maxBytesToRead) => {
      assert(typeof ptr == 'number', `UTF8ToString expects a number (got ${typeof ptr})`);
      return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : '';
    };
  var ___assert_fail = (condition, filename, line, func) => {
      abort(`Assertion failed: ${UTF8ToString(condition)}, at: ` + [filename ? UTF8ToString(filename) : 'unknown filename', line, func ? UTF8ToString(func) : 'unknown function']);
    };

  var PATH = {
  isAbs:(path) => path.charAt(0) === '/',
  splitPath:(filename) => {
        var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
        return splitPathRe.exec(filename).slice(1);
      },
  normalizeArray:(parts, allowAboveRoot) => {
        // if the path tries to go above the root, `up` ends up > 0
        var up = 0;
        for (var i = parts.length - 1; i >= 0; i--) {
          var last = parts[i];
          if (last === '.') {
            parts.splice(i, 1);
          } else if (last === '..') {
            parts.splice(i, 1);
            up++;
          } else if (up) {
            parts.splice(i, 1);
            up--;
          }
        }
        // if the path is allowed to go above the root, restore leading ..s
        if (allowAboveRoot) {
          for (; up; up--) {
            parts.unshift('..');
          }
        }
        return parts;
      },
  normalize:(path) => {
        var isAbsolute = PATH.isAbs(path),
            trailingSlash = path.substr(-1) === '/';
        // Normalize the path
        path = PATH.normalizeArray(path.split('/').filter((p) => !!p), !isAbsolute).join('/');
        if (!path && !isAbsolute) {
          path = '.';
        }
        if (path && trailingSlash) {
          path += '/';
        }
        return (isAbsolute ? '/' : '') + path;
      },
  dirname:(path) => {
        var result = PATH.splitPath(path),
            root = result[0],
            dir = result[1];
        if (!root && !dir) {
          // No dirname whatsoever
          return '.';
        }
        if (dir) {
          // It has a dirname, strip trailing slash
          dir = dir.substr(0, dir.length - 1);
        }
        return root + dir;
      },
  basename:(path) => {
        // EMSCRIPTEN return '/'' for '/', not an empty string
        if (path === '/') return '/';
        path = PATH.normalize(path);
        path = path.replace(/\/$/, "");
        var lastSlash = path.lastIndexOf('/');
        if (lastSlash === -1) return path;
        return path.substr(lastSlash+1);
      },
  join:(...paths) => PATH.normalize(paths.join('/')),
  join2:(l, r) => PATH.normalize(l + '/' + r),
  };
  
  var initRandomFill = () => {
      if (typeof crypto == 'object' && typeof crypto['getRandomValues'] == 'function') {
        // for modern web browsers
        return (view) => crypto.getRandomValues(view);
      } else
      if (ENVIRONMENT_IS_NODE) {
        // for nodejs with or without crypto support included
        try {
          var crypto_module = require('crypto');
          var randomFillSync = crypto_module['randomFillSync'];
          if (randomFillSync) {
            // nodejs with LTS crypto support
            return (view) => crypto_module['randomFillSync'](view);
          }
          // very old nodejs with the original crypto API
          var randomBytes = crypto_module['randomBytes'];
          return (view) => (
            view.set(randomBytes(view.byteLength)),
            // Return the original view to match modern native implementations.
            view
          );
        } catch (e) {
          // nodejs doesn't have crypto support
        }
      }
      // we couldn't find a proper implementation, as Math.random() is not suitable for /dev/random, see emscripten-core/emscripten/pull/7096
      abort('no cryptographic support found for randomDevice. consider polyfilling it if you want to use something insecure like Math.random(), e.g. put this in a --pre-js: var crypto = { getRandomValues: (array) => { for (var i = 0; i < array.length; i++) array[i] = (Math.random()*256)|0 } };');
    };
  var randomFill = (view) => {
      // Lazily init on the first invocation.
      return (randomFill = initRandomFill())(view);
    };
  
  
  
  var PATH_FS = {
  resolve:(...args) => {
        var resolvedPath = '',
          resolvedAbsolute = false;
        for (var i = args.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path = (i >= 0) ? args[i] : FS.cwd();
          // Skip empty and invalid entries
          if (typeof path != 'string') {
            throw new TypeError('Arguments to path.resolve must be strings');
          } else if (!path) {
            return ''; // an invalid portion invalidates the whole thing
          }
          resolvedPath = path + '/' + resolvedPath;
          resolvedAbsolute = PATH.isAbs(path);
        }
        // At this point the path should be resolved to a full absolute path, but
        // handle relative paths to be safe (might happen when process.cwd() fails)
        resolvedPath = PATH.normalizeArray(resolvedPath.split('/').filter((p) => !!p), !resolvedAbsolute).join('/');
        return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
      },
  relative:(from, to) => {
        from = PATH_FS.resolve(from).substr(1);
        to = PATH_FS.resolve(to).substr(1);
        function trim(arr) {
          var start = 0;
          for (; start < arr.length; start++) {
            if (arr[start] !== '') break;
          }
          var end = arr.length - 1;
          for (; end >= 0; end--) {
            if (arr[end] !== '') break;
          }
          if (start > end) return [];
          return arr.slice(start, end - start + 1);
        }
        var fromParts = trim(from.split('/'));
        var toParts = trim(to.split('/'));
        var length = Math.min(fromParts.length, toParts.length);
        var samePartsLength = length;
        for (var i = 0; i < length; i++) {
          if (fromParts[i] !== toParts[i]) {
            samePartsLength = i;
            break;
          }
        }
        var outputParts = [];
        for (var i = samePartsLength; i < fromParts.length; i++) {
          outputParts.push('..');
        }
        outputParts = outputParts.concat(toParts.slice(samePartsLength));
        return outputParts.join('/');
      },
  };
  
  
  
  var FS_stdin_getChar_buffer = [];
  
  var lengthBytesUTF8 = (str) => {
      var len = 0;
      for (var i = 0; i < str.length; ++i) {
        // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code
        // unit, not a Unicode code point of the character! So decode
        // UTF16->UTF32->UTF8.
        // See http://unicode.org/faq/utf_bom.html#utf16-3
        var c = str.charCodeAt(i); // possibly a lead surrogate
        if (c <= 0x7F) {
          len++;
        } else if (c <= 0x7FF) {
          len += 2;
        } else if (c >= 0xD800 && c <= 0xDFFF) {
          len += 4; ++i;
        } else {
          len += 3;
        }
      }
      return len;
    };
  
  var stringToUTF8Array = (str, heap, outIdx, maxBytesToWrite) => {
      assert(typeof str === 'string', `stringToUTF8Array expects a string (got ${typeof str})`);
      // Parameter maxBytesToWrite is not optional. Negative values, 0, null,
      // undefined and false each don't write out any bytes.
      if (!(maxBytesToWrite > 0))
        return 0;
  
      var startIdx = outIdx;
      var endIdx = outIdx + maxBytesToWrite - 1; // -1 for string null terminator.
      for (var i = 0; i < str.length; ++i) {
        // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code
        // unit, not a Unicode code point of the character! So decode
        // UTF16->UTF32->UTF8.
        // See http://unicode.org/faq/utf_bom.html#utf16-3
        // For UTF8 byte structure, see http://en.wikipedia.org/wiki/UTF-8#Description
        // and https://www.ietf.org/rfc/rfc2279.txt
        // and https://tools.ietf.org/html/rfc3629
        var u = str.charCodeAt(i); // possibly a lead surrogate
        if (u >= 0xD800 && u <= 0xDFFF) {
          var u1 = str.charCodeAt(++i);
          u = 0x10000 + ((u & 0x3FF) << 10) | (u1 & 0x3FF);
        }
        if (u <= 0x7F) {
          if (outIdx >= endIdx) break;
          heap[outIdx++] = u;
        } else if (u <= 0x7FF) {
          if (outIdx + 1 >= endIdx) break;
          heap[outIdx++] = 0xC0 | (u >> 6);
          heap[outIdx++] = 0x80 | (u & 63);
        } else if (u <= 0xFFFF) {
          if (outIdx + 2 >= endIdx) break;
          heap[outIdx++] = 0xE0 | (u >> 12);
          heap[outIdx++] = 0x80 | ((u >> 6) & 63);
          heap[outIdx++] = 0x80 | (u & 63);
        } else {
          if (outIdx + 3 >= endIdx) break;
          if (u > 0x10FFFF) warnOnce('Invalid Unicode code point ' + ptrToString(u) + ' encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF).');
          heap[outIdx++] = 0xF0 | (u >> 18);
          heap[outIdx++] = 0x80 | ((u >> 12) & 63);
          heap[outIdx++] = 0x80 | ((u >> 6) & 63);
          heap[outIdx++] = 0x80 | (u & 63);
        }
      }
      // Null-terminate the pointer to the buffer.
      heap[outIdx] = 0;
      return outIdx - startIdx;
    };
  /** @type {function(string, boolean=, number=)} */
  function intArrayFromString(stringy, dontAddNull, length) {
    var len = length > 0 ? length : lengthBytesUTF8(stringy)+1;
    var u8array = new Array(len);
    var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
    if (dontAddNull) u8array.length = numBytesWritten;
    return u8array;
  }
  var FS_stdin_getChar = () => {
      if (!FS_stdin_getChar_buffer.length) {
        var result = null;
        if (ENVIRONMENT_IS_NODE) {
          // we will read data by chunks of BUFSIZE
          var BUFSIZE = 256;
          var buf = Buffer.alloc(BUFSIZE);
          var bytesRead = 0;
  
          // For some reason we must suppress a closure warning here, even though
          // fd definitely exists on process.stdin, and is even the proper way to
          // get the fd of stdin,
          // https://github.com/nodejs/help/issues/2136#issuecomment-523649904
          // This started to happen after moving this logic out of library_tty.js,
          // so it is related to the surrounding code in some unclear manner.
          /** @suppress {missingProperties} */
          var fd = process.stdin.fd;
  
          try {
            bytesRead = fs.readSync(fd, buf);
          } catch(e) {
            // Cross-platform differences: on Windows, reading EOF throws an exception, but on other OSes,
            // reading EOF returns 0. Uniformize behavior by treating the EOF exception to return 0.
            if (e.toString().includes('EOF')) bytesRead = 0;
            else throw e;
          }
  
          if (bytesRead > 0) {
            result = buf.slice(0, bytesRead).toString('utf-8');
          } else {
            result = null;
          }
        } else
        if (typeof window != 'undefined' &&
          typeof window.prompt == 'function') {
          // Browser.
          result = window.prompt('Input: ');  // returns null on cancel
          if (result !== null) {
            result += '\n';
          }
        } else if (typeof readline == 'function') {
          // Command line.
          result = readline();
          if (result !== null) {
            result += '\n';
          }
        }
        if (!result) {
          return null;
        }
        FS_stdin_getChar_buffer = intArrayFromString(result, true);
      }
      return FS_stdin_getChar_buffer.shift();
    };
  var TTY = {
  ttys:[],
  init() {
        // https://github.com/emscripten-core/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // currently, FS.init does not distinguish if process.stdin is a file or TTY
        //   // device, it always assumes it's a TTY device. because of this, we're forcing
        //   // process.stdin to UTF8 encoding to at least make stdin reading compatible
        //   // with text files until FS.init can be refactored.
        //   process.stdin.setEncoding('utf8');
        // }
      },
  shutdown() {
        // https://github.com/emscripten-core/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // inolen: any idea as to why node -e 'process.stdin.read()' wouldn't exit immediately (with process.stdin being a tty)?
        //   // isaacs: because now it's reading from the stream, you've expressed interest in it, so that read() kicks off a _read() which creates a ReadReq operation
        //   // inolen: I thought read() in that case was a synchronous operation that just grabbed some amount of buffered data if it exists?
        //   // isaacs: it is. but it also triggers a _read() call, which calls readStart() on the handle
        //   // isaacs: do process.stdin.pause() and i'd think it'd probably close the pending call
        //   process.stdin.pause();
        // }
      },
  register(dev, ops) {
        TTY.ttys[dev] = { input: [], output: [], ops: ops };
        FS.registerDevice(dev, TTY.stream_ops);
      },
  stream_ops:{
  open(stream) {
          var tty = TTY.ttys[stream.node.rdev];
          if (!tty) {
            throw new FS.ErrnoError(43);
          }
          stream.tty = tty;
          stream.seekable = false;
        },
  close(stream) {
          // flush any pending line data
          stream.tty.ops.fsync(stream.tty);
        },
  fsync(stream) {
          stream.tty.ops.fsync(stream.tty);
        },
  read(stream, buffer, offset, length, pos /* ignored */) {
          if (!stream.tty || !stream.tty.ops.get_char) {
            throw new FS.ErrnoError(60);
          }
          var bytesRead = 0;
          for (var i = 0; i < length; i++) {
            var result;
            try {
              result = stream.tty.ops.get_char(stream.tty);
            } catch (e) {
              throw new FS.ErrnoError(29);
            }
            if (result === undefined && bytesRead === 0) {
              throw new FS.ErrnoError(6);
            }
            if (result === null || result === undefined) break;
            bytesRead++;
            buffer[offset+i] = result;
          }
          if (bytesRead) {
            stream.node.timestamp = Date.now();
          }
          return bytesRead;
        },
  write(stream, buffer, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.put_char) {
            throw new FS.ErrnoError(60);
          }
          try {
            for (var i = 0; i < length; i++) {
              stream.tty.ops.put_char(stream.tty, buffer[offset+i]);
            }
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
          if (length) {
            stream.node.timestamp = Date.now();
          }
          return i;
        },
  },
  default_tty_ops:{
  get_char(tty) {
          return FS_stdin_getChar();
        },
  put_char(tty, val) {
          if (val === null || val === 10) {
            out(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val); // val == 0 would cut text output off in the middle.
          }
        },
  fsync(tty) {
          if (tty.output && tty.output.length > 0) {
            out(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          }
        },
  ioctl_tcgets(tty) {
          // typical setting
          return {
            c_iflag: 25856,
            c_oflag: 5,
            c_cflag: 191,
            c_lflag: 35387,
            c_cc: [
              0x03, 0x1c, 0x7f, 0x15, 0x04, 0x00, 0x01, 0x00, 0x11, 0x13, 0x1a, 0x00,
              0x12, 0x0f, 0x17, 0x16, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
              0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            ]
          };
        },
  ioctl_tcsets(tty, optional_actions, data) {
          // currently just ignore
          return 0;
        },
  ioctl_tiocgwinsz(tty) {
          return [24, 80];
        },
  },
  default_tty1_ops:{
  put_char(tty, val) {
          if (val === null || val === 10) {
            err(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val);
          }
        },
  fsync(tty) {
          if (tty.output && tty.output.length > 0) {
            err(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          }
        },
  },
  };
  
  
  var zeroMemory = (address, size) => {
      HEAPU8.fill(0, address, address + size);
      return address;
    };
  
  var alignMemory = (size, alignment) => {
      assert(alignment, "alignment argument is required");
      return Math.ceil(size / alignment) * alignment;
    };
  var mmapAlloc = (size) => {
      size = alignMemory(size, 65536);
      var ptr = _emscripten_builtin_memalign(65536, size);
      if (!ptr) return 0;
      return zeroMemory(ptr, size);
    };
  var MEMFS = {
  ops_table:null,
  mount(mount) {
        return MEMFS.createNode(null, '/', 16384 | 511 /* 0777 */, 0);
      },
  createNode(parent, name, mode, dev) {
        if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
          // no supported
          throw new FS.ErrnoError(63);
        }
        MEMFS.ops_table ||= {
          dir: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr,
              lookup: MEMFS.node_ops.lookup,
              mknod: MEMFS.node_ops.mknod,
              rename: MEMFS.node_ops.rename,
              unlink: MEMFS.node_ops.unlink,
              rmdir: MEMFS.node_ops.rmdir,
              readdir: MEMFS.node_ops.readdir,
              symlink: MEMFS.node_ops.symlink
            },
            stream: {
              llseek: MEMFS.stream_ops.llseek
            }
          },
          file: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr
            },
            stream: {
              llseek: MEMFS.stream_ops.llseek,
              read: MEMFS.stream_ops.read,
              write: MEMFS.stream_ops.write,
              allocate: MEMFS.stream_ops.allocate,
              mmap: MEMFS.stream_ops.mmap,
              msync: MEMFS.stream_ops.msync
            }
          },
          link: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr,
              readlink: MEMFS.node_ops.readlink
            },
            stream: {}
          },
          chrdev: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr
            },
            stream: FS.chrdev_stream_ops
          }
        };
        var node = FS.createNode(parent, name, mode, dev);
        if (FS.isDir(node.mode)) {
          node.node_ops = MEMFS.ops_table.dir.node;
          node.stream_ops = MEMFS.ops_table.dir.stream;
          node.contents = {};
        } else if (FS.isFile(node.mode)) {
          node.node_ops = MEMFS.ops_table.file.node;
          node.stream_ops = MEMFS.ops_table.file.stream;
          node.usedBytes = 0; // The actual number of bytes used in the typed array, as opposed to contents.length which gives the whole capacity.
          // When the byte data of the file is populated, this will point to either a typed array, or a normal JS array. Typed arrays are preferred
          // for performance, and used by default. However, typed arrays are not resizable like normal JS arrays are, so there is a small disk size
          // penalty involved for appending file writes that continuously grow a file similar to std::vector capacity vs used -scheme.
          node.contents = null; 
        } else if (FS.isLink(node.mode)) {
          node.node_ops = MEMFS.ops_table.link.node;
          node.stream_ops = MEMFS.ops_table.link.stream;
        } else if (FS.isChrdev(node.mode)) {
          node.node_ops = MEMFS.ops_table.chrdev.node;
          node.stream_ops = MEMFS.ops_table.chrdev.stream;
        }
        node.timestamp = Date.now();
        // add the new node to the parent
        if (parent) {
          parent.contents[name] = node;
          parent.timestamp = node.timestamp;
        }
        return node;
      },
  getFileDataAsTypedArray(node) {
        if (!node.contents) return new Uint8Array(0);
        if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes); // Make sure to not return excess unused bytes.
        return new Uint8Array(node.contents);
      },
  expandFileStorage(node, newCapacity) {
        var prevCapacity = node.contents ? node.contents.length : 0;
        if (prevCapacity >= newCapacity) return; // No need to expand, the storage was already large enough.
        // Don't expand strictly to the given requested limit if it's only a very small increase, but instead geometrically grow capacity.
        // For small filesizes (<1MB), perform size*2 geometric increase, but for large sizes, do a much more conservative size*1.125 increase to
        // avoid overshooting the allocation cap by a very large margin.
        var CAPACITY_DOUBLING_MAX = 1024 * 1024;
        newCapacity = Math.max(newCapacity, (prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2.0 : 1.125)) >>> 0);
        if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256); // At minimum allocate 256b for each file when expanding.
        var oldContents = node.contents;
        node.contents = new Uint8Array(newCapacity); // Allocate new storage.
        if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0); // Copy old data over to the new storage.
      },
  resizeFileStorage(node, newSize) {
        if (node.usedBytes == newSize) return;
        if (newSize == 0) {
          node.contents = null; // Fully decommit when requesting a resize to zero.
          node.usedBytes = 0;
        } else {
          var oldContents = node.contents;
          node.contents = new Uint8Array(newSize); // Allocate new storage.
          if (oldContents) {
            node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes))); // Copy old data over to the new storage.
          }
          node.usedBytes = newSize;
        }
      },
  node_ops:{
  getattr(node) {
          var attr = {};
          // device numbers reuse inode numbers.
          attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
          attr.ino = node.id;
          attr.mode = node.mode;
          attr.nlink = 1;
          attr.uid = 0;
          attr.gid = 0;
          attr.rdev = node.rdev;
          if (FS.isDir(node.mode)) {
            attr.size = 4096;
          } else if (FS.isFile(node.mode)) {
            attr.size = node.usedBytes;
          } else if (FS.isLink(node.mode)) {
            attr.size = node.link.length;
          } else {
            attr.size = 0;
          }
          attr.atime = new Date(node.timestamp);
          attr.mtime = new Date(node.timestamp);
          attr.ctime = new Date(node.timestamp);
          // NOTE: In our implementation, st_blocks = Math.ceil(st_size/st_blksize),
          //       but this is not required by the standard.
          attr.blksize = 4096;
          attr.blocks = Math.ceil(attr.size / attr.blksize);
          return attr;
        },
  setattr(node, attr) {
          if (attr.mode !== undefined) {
            node.mode = attr.mode;
          }
          if (attr.timestamp !== undefined) {
            node.timestamp = attr.timestamp;
          }
          if (attr.size !== undefined) {
            MEMFS.resizeFileStorage(node, attr.size);
          }
        },
  lookup(parent, name) {
          throw FS.genericErrors[44];
        },
  mknod(parent, name, mode, dev) {
          return MEMFS.createNode(parent, name, mode, dev);
        },
  rename(old_node, new_dir, new_name) {
          // if we're overwriting a directory at new_name, make sure it's empty.
          if (FS.isDir(old_node.mode)) {
            var new_node;
            try {
              new_node = FS.lookupNode(new_dir, new_name);
            } catch (e) {
            }
            if (new_node) {
              for (var i in new_node.contents) {
                throw new FS.ErrnoError(55);
              }
            }
          }
          // do the internal rewiring
          delete old_node.parent.contents[old_node.name];
          old_node.parent.timestamp = Date.now()
          old_node.name = new_name;
          new_dir.contents[new_name] = old_node;
          new_dir.timestamp = old_node.parent.timestamp;
          old_node.parent = new_dir;
        },
  unlink(parent, name) {
          delete parent.contents[name];
          parent.timestamp = Date.now();
        },
  rmdir(parent, name) {
          var node = FS.lookupNode(parent, name);
          for (var i in node.contents) {
            throw new FS.ErrnoError(55);
          }
          delete parent.contents[name];
          parent.timestamp = Date.now();
        },
  readdir(node) {
          var entries = ['.', '..'];
          for (var key of Object.keys(node.contents)) {
            entries.push(key);
          }
          return entries;
        },
  symlink(parent, newname, oldpath) {
          var node = MEMFS.createNode(parent, newname, 511 /* 0777 */ | 40960, 0);
          node.link = oldpath;
          return node;
        },
  readlink(node) {
          if (!FS.isLink(node.mode)) {
            throw new FS.ErrnoError(28);
          }
          return node.link;
        },
  },
  stream_ops:{
  read(stream, buffer, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= stream.node.usedBytes) return 0;
          var size = Math.min(stream.node.usedBytes - position, length);
          assert(size >= 0);
          if (size > 8 && contents.subarray) { // non-trivial, and typed array
            buffer.set(contents.subarray(position, position + size), offset);
          } else {
            for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i];
          }
          return size;
        },
  write(stream, buffer, offset, length, position, canOwn) {
          // The data buffer should be a typed array view
          assert(!(buffer instanceof ArrayBuffer));
          // If the buffer is located in main memory (HEAP), and if
          // memory can grow, we can't hold on to references of the
          // memory buffer, as they may get invalidated. That means we
          // need to do copy its contents.
          if (buffer.buffer === HEAP8.buffer) {
            canOwn = false;
          }
  
          if (!length) return 0;
          var node = stream.node;
          node.timestamp = Date.now();
  
          if (buffer.subarray && (!node.contents || node.contents.subarray)) { // This write is from a typed array to a typed array?
            if (canOwn) {
              assert(position === 0, 'canOwn must imply no weird position inside the file');
              node.contents = buffer.subarray(offset, offset + length);
              node.usedBytes = length;
              return length;
            } else if (node.usedBytes === 0 && position === 0) { // If this is a simple first write to an empty file, do a fast set since we don't need to care about old data.
              node.contents = buffer.slice(offset, offset + length);
              node.usedBytes = length;
              return length;
            } else if (position + length <= node.usedBytes) { // Writing to an already allocated and used subrange of the file?
              node.contents.set(buffer.subarray(offset, offset + length), position);
              return length;
            }
          }
  
          // Appending to an existing file and we need to reallocate, or source data did not come as a typed array.
          MEMFS.expandFileStorage(node, position+length);
          if (node.contents.subarray && buffer.subarray) {
            // Use typed array write which is available.
            node.contents.set(buffer.subarray(offset, offset + length), position);
          } else {
            for (var i = 0; i < length; i++) {
             node.contents[position + i] = buffer[offset + i]; // Or fall back to manual write if not.
            }
          }
          node.usedBytes = Math.max(node.usedBytes, position + length);
          return length;
        },
  llseek(stream, offset, whence) {
          var position = offset;
          if (whence === 1) {
            position += stream.position;
          } else if (whence === 2) {
            if (FS.isFile(stream.node.mode)) {
              position += stream.node.usedBytes;
            }
          }
          if (position < 0) {
            throw new FS.ErrnoError(28);
          }
          return position;
        },
  allocate(stream, offset, length) {
          MEMFS.expandFileStorage(stream.node, offset + length);
          stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length);
        },
  mmap(stream, length, position, prot, flags) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(43);
          }
          var ptr;
          var allocated;
          var contents = stream.node.contents;
          // Only make a new copy when MAP_PRIVATE is specified.
          if (!(flags & 2) && contents.buffer === HEAP8.buffer) {
            // We can't emulate MAP_SHARED when the file is not backed by the
            // buffer we're mapping to (e.g. the HEAP buffer).
            allocated = false;
            ptr = contents.byteOffset;
          } else {
            // Try to avoid unnecessary slices.
            if (position > 0 || position + length < contents.length) {
              if (contents.subarray) {
                contents = contents.subarray(position, position + length);
              } else {
                contents = Array.prototype.slice.call(contents, position, position + length);
              }
            }
            allocated = true;
            ptr = mmapAlloc(length);
            if (!ptr) {
              throw new FS.ErrnoError(48);
            }
            HEAP8.set(contents, ptr);
          }
          return { ptr, allocated };
        },
  msync(stream, buffer, offset, length, mmapFlags) {
          MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
          // should we check if bytesWritten and length are the same?
          return 0;
        },
  },
  };
  
  /** @param {boolean=} noRunDep */
  var asyncLoad = (url, onload, onerror, noRunDep) => {
      var dep = !noRunDep ? getUniqueRunDependency(`al ${url}`) : '';
      readAsync(url, (arrayBuffer) => {
        assert(arrayBuffer, `Loading data file "${url}" failed (no arrayBuffer).`);
        onload(new Uint8Array(arrayBuffer));
        if (dep) removeRunDependency(dep);
      }, (event) => {
        if (onerror) {
          onerror();
        } else {
          throw `Loading data file "${url}" failed.`;
        }
      });
      if (dep) addRunDependency(dep);
    };
  
  
  var FS_createDataFile = (parent, name, fileData, canRead, canWrite, canOwn) => {
      FS.createDataFile(parent, name, fileData, canRead, canWrite, canOwn);
    };
  
  var preloadPlugins = Module['preloadPlugins'] || [];
  var FS_handledByPreloadPlugin = (byteArray, fullname, finish, onerror) => {
      // Ensure plugins are ready.
      if (typeof Browser != 'undefined') Browser.init();
  
      var handled = false;
      preloadPlugins.forEach((plugin) => {
        if (handled) return;
        if (plugin['canHandle'](fullname)) {
          plugin['handle'](byteArray, fullname, finish, onerror);
          handled = true;
        }
      });
      return handled;
    };
  var FS_createPreloadedFile = (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) => {
      // TODO we should allow people to just pass in a complete filename instead
      // of parent and name being that we just join them anyways
      var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
      var dep = getUniqueRunDependency(`cp ${fullname}`); // might have several active requests for the same fullname
      function processData(byteArray) {
        function finish(byteArray) {
          preFinish?.();
          if (!dontCreateFile) {
            FS_createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
          }
          onload?.();
          removeRunDependency(dep);
        }
        if (FS_handledByPreloadPlugin(byteArray, fullname, finish, () => {
          onerror?.();
          removeRunDependency(dep);
        })) {
          return;
        }
        finish(byteArray);
      }
      addRunDependency(dep);
      if (typeof url == 'string') {
        asyncLoad(url, processData, onerror);
      } else {
        processData(url);
      }
    };
  
  var FS_modeStringToFlags = (str) => {
      var flagModes = {
        'r': 0,
        'r+': 2,
        'w': 512 | 64 | 1,
        'w+': 512 | 64 | 2,
        'a': 1024 | 64 | 1,
        'a+': 1024 | 64 | 2,
      };
      var flags = flagModes[str];
      if (typeof flags == 'undefined') {
        throw new Error(`Unknown file open mode: ${str}`);
      }
      return flags;
    };
  
  var FS_getMode = (canRead, canWrite) => {
      var mode = 0;
      if (canRead) mode |= 292 | 73;
      if (canWrite) mode |= 146;
      return mode;
    };
  
  
  
  
  var ERRNO_MESSAGES = {
  0:"Success",
  1:"Arg list too long",
  2:"Permission denied",
  3:"Address already in use",
  4:"Address not available",
  5:"Address family not supported by protocol family",
  6:"No more processes",
  7:"Socket already connected",
  8:"Bad file number",
  9:"Trying to read unreadable message",
  10:"Mount device busy",
  11:"Operation canceled",
  12:"No children",
  13:"Connection aborted",
  14:"Connection refused",
  15:"Connection reset by peer",
  16:"File locking deadlock error",
  17:"Destination address required",
  18:"Math arg out of domain of func",
  19:"Quota exceeded",
  20:"File exists",
  21:"Bad address",
  22:"File too large",
  23:"Host is unreachable",
  24:"Identifier removed",
  25:"Illegal byte sequence",
  26:"Connection already in progress",
  27:"Interrupted system call",
  28:"Invalid argument",
  29:"I/O error",
  30:"Socket is already connected",
  31:"Is a directory",
  32:"Too many symbolic links",
  33:"Too many open files",
  34:"Too many links",
  35:"Message too long",
  36:"Multihop attempted",
  37:"File or path name too long",
  38:"Network interface is not configured",
  39:"Connection reset by network",
  40:"Network is unreachable",
  41:"Too many open files in system",
  42:"No buffer space available",
  43:"No such device",
  44:"No such file or directory",
  45:"Exec format error",
  46:"No record locks available",
  47:"The link has been severed",
  48:"Not enough core",
  49:"No message of desired type",
  50:"Protocol not available",
  51:"No space left on device",
  52:"Function not implemented",
  53:"Socket is not connected",
  54:"Not a directory",
  55:"Directory not empty",
  56:"State not recoverable",
  57:"Socket operation on non-socket",
  59:"Not a typewriter",
  60:"No such device or address",
  61:"Value too large for defined data type",
  62:"Previous owner died",
  63:"Not super-user",
  64:"Broken pipe",
  65:"Protocol error",
  66:"Unknown protocol",
  67:"Protocol wrong type for socket",
  68:"Math result not representable",
  69:"Read only file system",
  70:"Illegal seek",
  71:"No such process",
  72:"Stale file handle",
  73:"Connection timed out",
  74:"Text file busy",
  75:"Cross-device link",
  100:"Device not a stream",
  101:"Bad font file fmt",
  102:"Invalid slot",
  103:"Invalid request code",
  104:"No anode",
  105:"Block device required",
  106:"Channel number out of range",
  107:"Level 3 halted",
  108:"Level 3 reset",
  109:"Link number out of range",
  110:"Protocol driver not attached",
  111:"No CSI structure available",
  112:"Level 2 halted",
  113:"Invalid exchange",
  114:"Invalid request descriptor",
  115:"Exchange full",
  116:"No data (for no delay io)",
  117:"Timer expired",
  118:"Out of streams resources",
  119:"Machine is not on the network",
  120:"Package not installed",
  121:"The object is remote",
  122:"Advertise error",
  123:"Srmount error",
  124:"Communication error on send",
  125:"Cross mount point (not really error)",
  126:"Given log. name not unique",
  127:"f.d. invalid for this operation",
  128:"Remote address changed",
  129:"Can   access a needed shared lib",
  130:"Accessing a corrupted shared lib",
  131:".lib section in a.out corrupted",
  132:"Attempting to link in too many libs",
  133:"Attempting to exec a shared library",
  135:"Streams pipe error",
  136:"Too many users",
  137:"Socket type not supported",
  138:"Not supported",
  139:"Protocol family not supported",
  140:"Can't send after socket shutdown",
  141:"Too many references",
  142:"Host is down",
  148:"No medium (in tape drive)",
  156:"Level 2 not synchronized",
  };
  
  var ERRNO_CODES = {
      'EPERM': 63,
      'ENOENT': 44,
      'ESRCH': 71,
      'EINTR': 27,
      'EIO': 29,
      'ENXIO': 60,
      'E2BIG': 1,
      'ENOEXEC': 45,
      'EBADF': 8,
      'ECHILD': 12,
      'EAGAIN': 6,
      'EWOULDBLOCK': 6,
      'ENOMEM': 48,
      'EACCES': 2,
      'EFAULT': 21,
      'ENOTBLK': 105,
      'EBUSY': 10,
      'EEXIST': 20,
      'EXDEV': 75,
      'ENODEV': 43,
      'ENOTDIR': 54,
      'EISDIR': 31,
      'EINVAL': 28,
      'ENFILE': 41,
      'EMFILE': 33,
      'ENOTTY': 59,
      'ETXTBSY': 74,
      'EFBIG': 22,
      'ENOSPC': 51,
      'ESPIPE': 70,
      'EROFS': 69,
      'EMLINK': 34,
      'EPIPE': 64,
      'EDOM': 18,
      'ERANGE': 68,
      'ENOMSG': 49,
      'EIDRM': 24,
      'ECHRNG': 106,
      'EL2NSYNC': 156,
      'EL3HLT': 107,
      'EL3RST': 108,
      'ELNRNG': 109,
      'EUNATCH': 110,
      'ENOCSI': 111,
      'EL2HLT': 112,
      'EDEADLK': 16,
      'ENOLCK': 46,
      'EBADE': 113,
      'EBADR': 114,
      'EXFULL': 115,
      'ENOANO': 104,
      'EBADRQC': 103,
      'EBADSLT': 102,
      'EDEADLOCK': 16,
      'EBFONT': 101,
      'ENOSTR': 100,
      'ENODATA': 116,
      'ETIME': 117,
      'ENOSR': 118,
      'ENONET': 119,
      'ENOPKG': 120,
      'EREMOTE': 121,
      'ENOLINK': 47,
      'EADV': 122,
      'ESRMNT': 123,
      'ECOMM': 124,
      'EPROTO': 65,
      'EMULTIHOP': 36,
      'EDOTDOT': 125,
      'EBADMSG': 9,
      'ENOTUNIQ': 126,
      'EBADFD': 127,
      'EREMCHG': 128,
      'ELIBACC': 129,
      'ELIBBAD': 130,
      'ELIBSCN': 131,
      'ELIBMAX': 132,
      'ELIBEXEC': 133,
      'ENOSYS': 52,
      'ENOTEMPTY': 55,
      'ENAMETOOLONG': 37,
      'ELOOP': 32,
      'EOPNOTSUPP': 138,
      'EPFNOSUPPORT': 139,
      'ECONNRESET': 15,
      'ENOBUFS': 42,
      'EAFNOSUPPORT': 5,
      'EPROTOTYPE': 67,
      'ENOTSOCK': 57,
      'ENOPROTOOPT': 50,
      'ESHUTDOWN': 140,
      'ECONNREFUSED': 14,
      'EADDRINUSE': 3,
      'ECONNABORTED': 13,
      'ENETUNREACH': 40,
      'ENETDOWN': 38,
      'ETIMEDOUT': 73,
      'EHOSTDOWN': 142,
      'EHOSTUNREACH': 23,
      'EINPROGRESS': 26,
      'EALREADY': 7,
      'EDESTADDRREQ': 17,
      'EMSGSIZE': 35,
      'EPROTONOSUPPORT': 66,
      'ESOCKTNOSUPPORT': 137,
      'EADDRNOTAVAIL': 4,
      'ENETRESET': 39,
      'EISCONN': 30,
      'ENOTCONN': 53,
      'ETOOMANYREFS': 141,
      'EUSERS': 136,
      'EDQUOT': 19,
      'ESTALE': 72,
      'ENOTSUP': 138,
      'ENOMEDIUM': 148,
      'EILSEQ': 25,
      'EOVERFLOW': 61,
      'ECANCELED': 11,
      'ENOTRECOVERABLE': 56,
      'EOWNERDEAD': 62,
      'ESTRPIPE': 135,
    };
  var FS = {
  root:null,
  mounts:[],
  devices:{
  },
  streams:[],
  nextInode:1,
  nameTable:null,
  currentPath:"/",
  initialized:false,
  ignorePermissions:true,
  ErrnoError:class extends Error {
        // We set the `name` property to be able to identify `FS.ErrnoError`
        // - the `name` is a standard ECMA-262 property of error objects. Kind of good to have it anyway.
        // - when using PROXYFS, an error can come from an underlying FS
        // as different FS objects have their own FS.ErrnoError each,
        // the test `err instanceof FS.ErrnoError` won't detect an error coming from another filesystem, causing bugs.
        // we'll use the reliable test `err.name == "ErrnoError"` instead
        constructor(errno) {
          super(ERRNO_MESSAGES[errno]);
          // TODO(sbc): Use the inline member delclaration syntax once we
          // support it in acorn and closure.
          this.name = 'ErrnoError';
          this.errno = errno;
          for (var key in ERRNO_CODES) {
            if (ERRNO_CODES[key] === errno) {
              this.code = key;
              break;
            }
          }
        }
      },
  genericErrors:{
  },
  filesystems:null,
  syncFSRequests:0,
  lookupPath(path, opts = {}) {
        path = PATH_FS.resolve(path);
  
        if (!path) return { path: '', node: null };
  
        var defaults = {
          follow_mount: true,
          recurse_count: 0
        };
        opts = Object.assign(defaults, opts)
  
        if (opts.recurse_count > 8) {  // max recursive lookup of 8
          throw new FS.ErrnoError(32);
        }
  
        // split the absolute path
        var parts = path.split('/').filter((p) => !!p);
  
        // start at the root
        var current = FS.root;
        var current_path = '/';
  
        for (var i = 0; i < parts.length; i++) {
          var islast = (i === parts.length-1);
          if (islast && opts.parent) {
            // stop resolving
            break;
          }
  
          current = FS.lookupNode(current, parts[i]);
          current_path = PATH.join2(current_path, parts[i]);
  
          // jump to the mount's root node if this is a mountpoint
          if (FS.isMountpoint(current)) {
            if (!islast || (islast && opts.follow_mount)) {
              current = current.mounted.root;
            }
          }
  
          // by default, lookupPath will not follow a symlink if it is the final path component.
          // setting opts.follow = true will override this behavior.
          if (!islast || opts.follow) {
            var count = 0;
            while (FS.isLink(current.mode)) {
              var link = FS.readlink(current_path);
              current_path = PATH_FS.resolve(PATH.dirname(current_path), link);
  
              var lookup = FS.lookupPath(current_path, { recurse_count: opts.recurse_count + 1 });
              current = lookup.node;
  
              if (count++ > 40) {  // limit max consecutive symlinks to 40 (SYMLOOP_MAX).
                throw new FS.ErrnoError(32);
              }
            }
          }
        }
  
        return { path: current_path, node: current };
      },
  getPath(node) {
        var path;
        while (true) {
          if (FS.isRoot(node)) {
            var mount = node.mount.mountpoint;
            if (!path) return mount;
            return mount[mount.length-1] !== '/' ? `${mount}/${path}` : mount + path;
          }
          path = path ? `${node.name}/${path}` : node.name;
          node = node.parent;
        }
      },
  hashName(parentid, name) {
        var hash = 0;
  
        for (var i = 0; i < name.length; i++) {
          hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
        }
        return ((parentid + hash) >>> 0) % FS.nameTable.length;
      },
  hashAddNode(node) {
        var hash = FS.hashName(node.parent.id, node.name);
        node.name_next = FS.nameTable[hash];
        FS.nameTable[hash] = node;
      },
  hashRemoveNode(node) {
        var hash = FS.hashName(node.parent.id, node.name);
        if (FS.nameTable[hash] === node) {
          FS.nameTable[hash] = node.name_next;
        } else {
          var current = FS.nameTable[hash];
          while (current) {
            if (current.name_next === node) {
              current.name_next = node.name_next;
              break;
            }
            current = current.name_next;
          }
        }
      },
  lookupNode(parent, name) {
        var errCode = FS.mayLookup(parent);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        var hash = FS.hashName(parent.id, name);
        for (var node = FS.nameTable[hash]; node; node = node.name_next) {
          var nodeName = node.name;
          if (node.parent.id === parent.id && nodeName === name) {
            return node;
          }
        }
        // if we failed to find it in the cache, call into the VFS
        return FS.lookup(parent, name);
      },
  createNode(parent, name, mode, rdev) {
        assert(typeof parent == 'object')
        var node = new FS.FSNode(parent, name, mode, rdev);
  
        FS.hashAddNode(node);
  
        return node;
      },
  destroyNode(node) {
        FS.hashRemoveNode(node);
      },
  isRoot(node) {
        return node === node.parent;
      },
  isMountpoint(node) {
        return !!node.mounted;
      },
  isFile(mode) {
        return (mode & 61440) === 32768;
      },
  isDir(mode) {
        return (mode & 61440) === 16384;
      },
  isLink(mode) {
        return (mode & 61440) === 40960;
      },
  isChrdev(mode) {
        return (mode & 61440) === 8192;
      },
  isBlkdev(mode) {
        return (mode & 61440) === 24576;
      },
  isFIFO(mode) {
        return (mode & 61440) === 4096;
      },
  isSocket(mode) {
        return (mode & 49152) === 49152;
      },
  flagsToPermissionString(flag) {
        var perms = ['r', 'w', 'rw'][flag & 3];
        if ((flag & 512)) {
          perms += 'w';
        }
        return perms;
      },
  nodePermissions(node, perms) {
        if (FS.ignorePermissions) {
          return 0;
        }
        // return 0 if any user, group or owner bits are set.
        if (perms.includes('r') && !(node.mode & 292)) {
          return 2;
        } else if (perms.includes('w') && !(node.mode & 146)) {
          return 2;
        } else if (perms.includes('x') && !(node.mode & 73)) {
          return 2;
        }
        return 0;
      },
  mayLookup(dir) {
        if (!FS.isDir(dir.mode)) return 54;
        var errCode = FS.nodePermissions(dir, 'x');
        if (errCode) return errCode;
        if (!dir.node_ops.lookup) return 2;
        return 0;
      },
  mayCreate(dir, name) {
        try {
          var node = FS.lookupNode(dir, name);
          return 20;
        } catch (e) {
        }
        return FS.nodePermissions(dir, 'wx');
      },
  mayDelete(dir, name, isdir) {
        var node;
        try {
          node = FS.lookupNode(dir, name);
        } catch (e) {
          return e.errno;
        }
        var errCode = FS.nodePermissions(dir, 'wx');
        if (errCode) {
          return errCode;
        }
        if (isdir) {
          if (!FS.isDir(node.mode)) {
            return 54;
          }
          if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
            return 10;
          }
        } else {
          if (FS.isDir(node.mode)) {
            return 31;
          }
        }
        return 0;
      },
  mayOpen(node, flags) {
        if (!node) {
          return 44;
        }
        if (FS.isLink(node.mode)) {
          return 32;
        } else if (FS.isDir(node.mode)) {
          if (FS.flagsToPermissionString(flags) !== 'r' || // opening for write
              (flags & 512)) { // TODO: check for O_SEARCH? (== search for dir only)
            return 31;
          }
        }
        return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
      },
  MAX_OPEN_FDS:4096,
  nextfd() {
        for (var fd = 0; fd <= FS.MAX_OPEN_FDS; fd++) {
          if (!FS.streams[fd]) {
            return fd;
          }
        }
        throw new FS.ErrnoError(33);
      },
  getStreamChecked(fd) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(8);
        }
        return stream;
      },
  getStream:(fd) => FS.streams[fd],
  createStream(stream, fd = -1) {
        if (!FS.FSStream) {
          FS.FSStream = /** @constructor */ function() {
            this.shared = { };
          };
          FS.FSStream.prototype = {};
          Object.defineProperties(FS.FSStream.prototype, {
            object: {
              /** @this {FS.FSStream} */
              get() { return this.node; },
              /** @this {FS.FSStream} */
              set(val) { this.node = val; }
            },
            isRead: {
              /** @this {FS.FSStream} */
              get() { return (this.flags & 2097155) !== 1; }
            },
            isWrite: {
              /** @this {FS.FSStream} */
              get() { return (this.flags & 2097155) !== 0; }
            },
            isAppend: {
              /** @this {FS.FSStream} */
              get() { return (this.flags & 1024); }
            },
            flags: {
              /** @this {FS.FSStream} */
              get() { return this.shared.flags; },
              /** @this {FS.FSStream} */
              set(val) { this.shared.flags = val; },
            },
            position : {
              /** @this {FS.FSStream} */
              get() { return this.shared.position; },
              /** @this {FS.FSStream} */
              set(val) { this.shared.position = val; },
            },
          });
        }
        // clone it, so we can return an instance of FSStream
        stream = Object.assign(new FS.FSStream(), stream);
        if (fd == -1) {
          fd = FS.nextfd();
        }
        stream.fd = fd;
        FS.streams[fd] = stream;
        return stream;
      },
  closeStream(fd) {
        FS.streams[fd] = null;
      },
  chrdev_stream_ops:{
  open(stream) {
          var device = FS.getDevice(stream.node.rdev);
          // override node's stream ops with the device's
          stream.stream_ops = device.stream_ops;
          // forward the open call
          stream.stream_ops.open?.(stream);
        },
  llseek() {
          throw new FS.ErrnoError(70);
        },
  },
  major:(dev) => ((dev) >> 8),
  minor:(dev) => ((dev) & 0xff),
  makedev:(ma, mi) => ((ma) << 8 | (mi)),
  registerDevice(dev, ops) {
        FS.devices[dev] = { stream_ops: ops };
      },
  getDevice:(dev) => FS.devices[dev],
  getMounts(mount) {
        var mounts = [];
        var check = [mount];
  
        while (check.length) {
          var m = check.pop();
  
          mounts.push(m);
  
          check.push(...m.mounts);
        }
  
        return mounts;
      },
  syncfs(populate, callback) {
        if (typeof populate == 'function') {
          callback = populate;
          populate = false;
        }
  
        FS.syncFSRequests++;
  
        if (FS.syncFSRequests > 1) {
          err(`warning: ${FS.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`);
        }
  
        var mounts = FS.getMounts(FS.root.mount);
        var completed = 0;
  
        function doCallback(errCode) {
          assert(FS.syncFSRequests > 0);
          FS.syncFSRequests--;
          return callback(errCode);
        }
  
        function done(errCode) {
          if (errCode) {
            if (!done.errored) {
              done.errored = true;
              return doCallback(errCode);
            }
            return;
          }
          if (++completed >= mounts.length) {
            doCallback(null);
          }
        };
  
        // sync all mounts
        mounts.forEach((mount) => {
          if (!mount.type.syncfs) {
            return done(null);
          }
          mount.type.syncfs(mount, populate, done);
        });
      },
  mount(type, opts, mountpoint) {
        if (typeof type == 'string') {
          // The filesystem was not included, and instead we have an error
          // message stored in the variable.
          throw type;
        }
        var root = mountpoint === '/';
        var pseudo = !mountpoint;
        var node;
  
        if (root && FS.root) {
          throw new FS.ErrnoError(10);
        } else if (!root && !pseudo) {
          var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
          mountpoint = lookup.path;  // use the absolute path
          node = lookup.node;
  
          if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(10);
          }
  
          if (!FS.isDir(node.mode)) {
            throw new FS.ErrnoError(54);
          }
        }
  
        var mount = {
          type,
          opts,
          mountpoint,
          mounts: []
        };
  
        // create a root node for the fs
        var mountRoot = type.mount(mount);
        mountRoot.mount = mount;
        mount.root = mountRoot;
  
        if (root) {
          FS.root = mountRoot;
        } else if (node) {
          // set as a mountpoint
          node.mounted = mount;
  
          // add the new mount to the current mount's children
          if (node.mount) {
            node.mount.mounts.push(mount);
          }
        }
  
        return mountRoot;
      },
  unmount(mountpoint) {
        var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
        if (!FS.isMountpoint(lookup.node)) {
          throw new FS.ErrnoError(28);
        }
  
        // destroy the nodes for this mount, and all its child mounts
        var node = lookup.node;
        var mount = node.mounted;
        var mounts = FS.getMounts(mount);
  
        Object.keys(FS.nameTable).forEach((hash) => {
          var current = FS.nameTable[hash];
  
          while (current) {
            var next = current.name_next;
  
            if (mounts.includes(current.mount)) {
              FS.destroyNode(current);
            }
  
            current = next;
          }
        });
  
        // no longer a mountpoint
        node.mounted = null;
  
        // remove this mount from the child mounts
        var idx = node.mount.mounts.indexOf(mount);
        assert(idx !== -1);
        node.mount.mounts.splice(idx, 1);
      },
  lookup(parent, name) {
        return parent.node_ops.lookup(parent, name);
      },
  mknod(path, mode, dev) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        if (!name || name === '.' || name === '..') {
          throw new FS.ErrnoError(28);
        }
        var errCode = FS.mayCreate(parent, name);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.mknod) {
          throw new FS.ErrnoError(63);
        }
        return parent.node_ops.mknod(parent, name, mode, dev);
      },
  create(path, mode) {
        mode = mode !== undefined ? mode : 438 /* 0666 */;
        mode &= 4095;
        mode |= 32768;
        return FS.mknod(path, mode, 0);
      },
  mkdir(path, mode) {
        mode = mode !== undefined ? mode : 511 /* 0777 */;
        mode &= 511 | 512;
        mode |= 16384;
        return FS.mknod(path, mode, 0);
      },
  mkdirTree(path, mode) {
        var dirs = path.split('/');
        var d = '';
        for (var i = 0; i < dirs.length; ++i) {
          if (!dirs[i]) continue;
          d += '/' + dirs[i];
          try {
            FS.mkdir(d, mode);
          } catch(e) {
            if (e.errno != 20) throw e;
          }
        }
      },
  mkdev(path, mode, dev) {
        if (typeof dev == 'undefined') {
          dev = mode;
          mode = 438 /* 0666 */;
        }
        mode |= 8192;
        return FS.mknod(path, mode, dev);
      },
  symlink(oldpath, newpath) {
        if (!PATH_FS.resolve(oldpath)) {
          throw new FS.ErrnoError(44);
        }
        var lookup = FS.lookupPath(newpath, { parent: true });
        var parent = lookup.node;
        if (!parent) {
          throw new FS.ErrnoError(44);
        }
        var newname = PATH.basename(newpath);
        var errCode = FS.mayCreate(parent, newname);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.symlink) {
          throw new FS.ErrnoError(63);
        }
        return parent.node_ops.symlink(parent, newname, oldpath);
      },
  rename(old_path, new_path) {
        var old_dirname = PATH.dirname(old_path);
        var new_dirname = PATH.dirname(new_path);
        var old_name = PATH.basename(old_path);
        var new_name = PATH.basename(new_path);
        // parents must exist
        var lookup, old_dir, new_dir;
  
        // let the errors from non existant directories percolate up
        lookup = FS.lookupPath(old_path, { parent: true });
        old_dir = lookup.node;
        lookup = FS.lookupPath(new_path, { parent: true });
        new_dir = lookup.node;
  
        if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
        // need to be part of the same mount
        if (old_dir.mount !== new_dir.mount) {
          throw new FS.ErrnoError(75);
        }
        // source must exist
        var old_node = FS.lookupNode(old_dir, old_name);
        // old path should not be an ancestor of the new path
        var relative = PATH_FS.relative(old_path, new_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(28);
        }
        // new path should not be an ancestor of the old path
        relative = PATH_FS.relative(new_path, old_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(55);
        }
        // see if the new path already exists
        var new_node;
        try {
          new_node = FS.lookupNode(new_dir, new_name);
        } catch (e) {
          // not fatal
        }
        // early out if nothing needs to change
        if (old_node === new_node) {
          return;
        }
        // we'll need to delete the old entry
        var isdir = FS.isDir(old_node.mode);
        var errCode = FS.mayDelete(old_dir, old_name, isdir);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        // need delete permissions if we'll be overwriting.
        // need create permissions if new doesn't already exist.
        errCode = new_node ?
          FS.mayDelete(new_dir, new_name, isdir) :
          FS.mayCreate(new_dir, new_name);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!old_dir.node_ops.rename) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(old_node) || (new_node && FS.isMountpoint(new_node))) {
          throw new FS.ErrnoError(10);
        }
        // if we are going to change the parent, check write permissions
        if (new_dir !== old_dir) {
          errCode = FS.nodePermissions(old_dir, 'w');
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
        }
        // remove the node from the lookup hash
        FS.hashRemoveNode(old_node);
        // do the underlying fs rename
        try {
          old_dir.node_ops.rename(old_node, new_dir, new_name);
        } catch (e) {
          throw e;
        } finally {
          // add the node back to the hash (in case node_ops.rename
          // changed its name)
          FS.hashAddNode(old_node);
        }
      },
  rmdir(path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var errCode = FS.mayDelete(parent, name, true);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.rmdir) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10);
        }
        parent.node_ops.rmdir(parent, name);
        FS.destroyNode(node);
      },
  readdir(path) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        if (!node.node_ops.readdir) {
          throw new FS.ErrnoError(54);
        }
        return node.node_ops.readdir(node);
      },
  unlink(path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        if (!parent) {
          throw new FS.ErrnoError(44);
        }
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var errCode = FS.mayDelete(parent, name, false);
        if (errCode) {
          // According to POSIX, we should map EISDIR to EPERM, but
          // we instead do what Linux does (and we must, as we use
          // the musl linux libc).
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.unlink) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10);
        }
        parent.node_ops.unlink(parent, name);
        FS.destroyNode(node);
      },
  readlink(path) {
        var lookup = FS.lookupPath(path);
        var link = lookup.node;
        if (!link) {
          throw new FS.ErrnoError(44);
        }
        if (!link.node_ops.readlink) {
          throw new FS.ErrnoError(28);
        }
        return PATH_FS.resolve(FS.getPath(link.parent), link.node_ops.readlink(link));
      },
  stat(path, dontFollow) {
        var lookup = FS.lookupPath(path, { follow: !dontFollow });
        var node = lookup.node;
        if (!node) {
          throw new FS.ErrnoError(44);
        }
        if (!node.node_ops.getattr) {
          throw new FS.ErrnoError(63);
        }
        return node.node_ops.getattr(node);
      },
  lstat(path) {
        return FS.stat(path, true);
      },
  chmod(path, mode, dontFollow) {
        var node;
        if (typeof path == 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        node.node_ops.setattr(node, {
          mode: (mode & 4095) | (node.mode & ~4095),
          timestamp: Date.now()
        });
      },
  lchmod(path, mode) {
        FS.chmod(path, mode, true);
      },
  fchmod(fd, mode) {
        var stream = FS.getStreamChecked(fd);
        FS.chmod(stream.node, mode);
      },
  chown(path, uid, gid, dontFollow) {
        var node;
        if (typeof path == 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        node.node_ops.setattr(node, {
          timestamp: Date.now()
          // we ignore the uid / gid for now
        });
      },
  lchown(path, uid, gid) {
        FS.chown(path, uid, gid, true);
      },
  fchown(fd, uid, gid) {
        var stream = FS.getStreamChecked(fd);
        FS.chown(stream.node, uid, gid);
      },
  truncate(path, len) {
        if (len < 0) {
          throw new FS.ErrnoError(28);
        }
        var node;
        if (typeof path == 'string') {
          var lookup = FS.lookupPath(path, { follow: true });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isDir(node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!FS.isFile(node.mode)) {
          throw new FS.ErrnoError(28);
        }
        var errCode = FS.nodePermissions(node, 'w');
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        node.node_ops.setattr(node, {
          size: len,
          timestamp: Date.now()
        });
      },
  ftruncate(fd, len) {
        var stream = FS.getStreamChecked(fd);
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(28);
        }
        FS.truncate(stream.node, len);
      },
  utime(path, atime, mtime) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        node.node_ops.setattr(node, {
          timestamp: Math.max(atime, mtime)
        });
      },
  open(path, flags, mode) {
        if (path === "") {
          throw new FS.ErrnoError(44);
        }
        flags = typeof flags == 'string' ? FS_modeStringToFlags(flags) : flags;
        mode = typeof mode == 'undefined' ? 438 /* 0666 */ : mode;
        if ((flags & 64)) {
          mode = (mode & 4095) | 32768;
        } else {
          mode = 0;
        }
        var node;
        if (typeof path == 'object') {
          node = path;
        } else {
          path = PATH.normalize(path);
          try {
            var lookup = FS.lookupPath(path, {
              follow: !(flags & 131072)
            });
            node = lookup.node;
          } catch (e) {
            // ignore
          }
        }
        // perhaps we need to create the node
        var created = false;
        if ((flags & 64)) {
          if (node) {
            // if O_CREAT and O_EXCL are set, error out if the node already exists
            if ((flags & 128)) {
              throw new FS.ErrnoError(20);
            }
          } else {
            // node doesn't exist, try to create it
            node = FS.mknod(path, mode, 0);
            created = true;
          }
        }
        if (!node) {
          throw new FS.ErrnoError(44);
        }
        // can't truncate a device
        if (FS.isChrdev(node.mode)) {
          flags &= ~512;
        }
        // if asked only for a directory, then this must be one
        if ((flags & 65536) && !FS.isDir(node.mode)) {
          throw new FS.ErrnoError(54);
        }
        // check permissions, if this is not a file we just created now (it is ok to
        // create and write to a file with read-only permissions; it is read-only
        // for later use)
        if (!created) {
          var errCode = FS.mayOpen(node, flags);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
        }
        // do truncation if necessary
        if ((flags & 512) && !created) {
          FS.truncate(node, 0);
        }
        // we've already handled these, don't pass down to the underlying vfs
        flags &= ~(128 | 512 | 131072);
  
        // register the stream with the filesystem
        var stream = FS.createStream({
          node,
          path: FS.getPath(node),  // we want the absolute path to the node
          flags,
          seekable: true,
          position: 0,
          stream_ops: node.stream_ops,
          // used by the file family libc calls (fopen, fwrite, ferror, etc.)
          ungotten: [],
          error: false
        });
        // call the new stream's open function
        if (stream.stream_ops.open) {
          stream.stream_ops.open(stream);
        }
        if (Module['logReadFiles'] && !(flags & 1)) {
          if (!FS.readFiles) FS.readFiles = {};
          if (!(path in FS.readFiles)) {
            FS.readFiles[path] = 1;
          }
        }
        return stream;
      },
  close(stream) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (stream.getdents) stream.getdents = null; // free readdir state
        try {
          if (stream.stream_ops.close) {
            stream.stream_ops.close(stream);
          }
        } catch (e) {
          throw e;
        } finally {
          FS.closeStream(stream.fd);
        }
        stream.fd = null;
      },
  isClosed(stream) {
        return stream.fd === null;
      },
  llseek(stream, offset, whence) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (!stream.seekable || !stream.stream_ops.llseek) {
          throw new FS.ErrnoError(70);
        }
        if (whence != 0 && whence != 1 && whence != 2) {
          throw new FS.ErrnoError(28);
        }
        stream.position = stream.stream_ops.llseek(stream, offset, whence);
        stream.ungotten = [];
        return stream.position;
      },
  read(stream, buffer, offset, length, position) {
        assert(offset >= 0);
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(28);
        }
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(8);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!stream.stream_ops.read) {
          throw new FS.ErrnoError(28);
        }
        var seeking = typeof position != 'undefined';
        if (!seeking) {
          position = stream.position;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(70);
        }
        var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
        if (!seeking) stream.position += bytesRead;
        return bytesRead;
      },
  write(stream, buffer, offset, length, position, canOwn) {
        assert(offset >= 0);
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(28);
        }
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(8);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!stream.stream_ops.write) {
          throw new FS.ErrnoError(28);
        }
        if (stream.seekable && stream.flags & 1024) {
          // seek to the end before writing in append mode
          FS.llseek(stream, 0, 2);
        }
        var seeking = typeof position != 'undefined';
        if (!seeking) {
          position = stream.position;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(70);
        }
        var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
        if (!seeking) stream.position += bytesWritten;
        return bytesWritten;
      },
  allocate(stream, offset, length) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (offset < 0 || length <= 0) {
          throw new FS.ErrnoError(28);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(8);
        }
        if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(43);
        }
        if (!stream.stream_ops.allocate) {
          throw new FS.ErrnoError(138);
        }
        stream.stream_ops.allocate(stream, offset, length);
      },
  mmap(stream, length, position, prot, flags) {
        // User requests writing to file (prot & PROT_WRITE != 0).
        // Checking if we have permissions to write to the file unless
        // MAP_PRIVATE flag is set. According to POSIX spec it is possible
        // to write to file opened in read-only mode with MAP_PRIVATE flag,
        // as all modifications will be visible only in the memory of
        // the current process.
        if ((prot & 2) !== 0
            && (flags & 2) === 0
            && (stream.flags & 2097155) !== 2) {
          throw new FS.ErrnoError(2);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(2);
        }
        if (!stream.stream_ops.mmap) {
          throw new FS.ErrnoError(43);
        }
        return stream.stream_ops.mmap(stream, length, position, prot, flags);
      },
  msync(stream, buffer, offset, length, mmapFlags) {
        assert(offset >= 0);
        if (!stream.stream_ops.msync) {
          return 0;
        }
        return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
      },
  munmap:(stream) => 0,
  ioctl(stream, cmd, arg) {
        if (!stream.stream_ops.ioctl) {
          throw new FS.ErrnoError(59);
        }
        return stream.stream_ops.ioctl(stream, cmd, arg);
      },
  readFile(path, opts = {}) {
        opts.flags = opts.flags || 0;
        opts.encoding = opts.encoding || 'binary';
        if (opts.encoding !== 'utf8' && opts.encoding !== 'binary') {
          throw new Error(`Invalid encoding type "${opts.encoding}"`);
        }
        var ret;
        var stream = FS.open(path, opts.flags);
        var stat = FS.stat(path);
        var length = stat.size;
        var buf = new Uint8Array(length);
        FS.read(stream, buf, 0, length, 0);
        if (opts.encoding === 'utf8') {
          ret = UTF8ArrayToString(buf, 0);
        } else if (opts.encoding === 'binary') {
          ret = buf;
        }
        FS.close(stream);
        return ret;
      },
  writeFile(path, data, opts = {}) {
        opts.flags = opts.flags || 577;
        var stream = FS.open(path, opts.flags, opts.mode);
        if (typeof data == 'string') {
          var buf = new Uint8Array(lengthBytesUTF8(data)+1);
          var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
          FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn);
        } else if (ArrayBuffer.isView(data)) {
          FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn);
        } else {
          throw new Error('Unsupported data type');
        }
        FS.close(stream);
      },
  cwd:() => FS.currentPath,
  chdir(path) {
        var lookup = FS.lookupPath(path, { follow: true });
        if (lookup.node === null) {
          throw new FS.ErrnoError(44);
        }
        if (!FS.isDir(lookup.node.mode)) {
          throw new FS.ErrnoError(54);
        }
        var errCode = FS.nodePermissions(lookup.node, 'x');
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        FS.currentPath = lookup.path;
      },
  createDefaultDirectories() {
        FS.mkdir('/tmp');
        FS.mkdir('/home');
        FS.mkdir('/home/web_user');
      },
  createDefaultDevices() {
        // create /dev
        FS.mkdir('/dev');
        // setup /dev/null
        FS.registerDevice(FS.makedev(1, 3), {
          read: () => 0,
          write: (stream, buffer, offset, length, pos) => length,
        });
        FS.mkdev('/dev/null', FS.makedev(1, 3));
        // setup /dev/tty and /dev/tty1
        // stderr needs to print output using err() rather than out()
        // so we register a second tty just for it.
        TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
        TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
        FS.mkdev('/dev/tty', FS.makedev(5, 0));
        FS.mkdev('/dev/tty1', FS.makedev(6, 0));
        // setup /dev/[u]random
        // use a buffer to avoid overhead of individual crypto calls per byte
        var randomBuffer = new Uint8Array(1024), randomLeft = 0;
        var randomByte = () => {
          if (randomLeft === 0) {
            randomLeft = randomFill(randomBuffer).byteLength;
          }
          return randomBuffer[--randomLeft];
        };
        FS.createDevice('/dev', 'random', randomByte);
        FS.createDevice('/dev', 'urandom', randomByte);
        // we're not going to emulate the actual shm device,
        // just create the tmp dirs that reside in it commonly
        FS.mkdir('/dev/shm');
        FS.mkdir('/dev/shm/tmp');
      },
  createSpecialDirectories() {
        // create /proc/self/fd which allows /proc/self/fd/6 => readlink gives the
        // name of the stream for fd 6 (see test_unistd_ttyname)
        FS.mkdir('/proc');
        var proc_self = FS.mkdir('/proc/self');
        FS.mkdir('/proc/self/fd');
        FS.mount({
          mount() {
            var node = FS.createNode(proc_self, 'fd', 16384 | 511 /* 0777 */, 73);
            node.node_ops = {
              lookup(parent, name) {
                var fd = +name;
                var stream = FS.getStreamChecked(fd);
                var ret = {
                  parent: null,
                  mount: { mountpoint: 'fake' },
                  node_ops: { readlink: () => stream.path },
                };
                ret.parent = ret; // make it look like a simple root node
                return ret;
              }
            };
            return node;
          }
        }, {}, '/proc/self/fd');
      },
  createStandardStreams() {
        // TODO deprecate the old functionality of a single
        // input / output callback and that utilizes FS.createDevice
        // and instead require a unique set of stream ops
  
        // by default, we symlink the standard streams to the
        // default tty devices. however, if the standard streams
        // have been overwritten we create a unique device for
        // them instead.
        if (Module['stdin']) {
          FS.createDevice('/dev', 'stdin', Module['stdin']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdin');
        }
        if (Module['stdout']) {
          FS.createDevice('/dev', 'stdout', null, Module['stdout']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdout');
        }
        if (Module['stderr']) {
          FS.createDevice('/dev', 'stderr', null, Module['stderr']);
        } else {
          FS.symlink('/dev/tty1', '/dev/stderr');
        }
  
        // open default streams for the stdin, stdout and stderr devices
        var stdin = FS.open('/dev/stdin', 0);
        var stdout = FS.open('/dev/stdout', 1);
        var stderr = FS.open('/dev/stderr', 1);
        assert(stdin.fd === 0, `invalid handle for stdin (${stdin.fd})`);
        assert(stdout.fd === 1, `invalid handle for stdout (${stdout.fd})`);
        assert(stderr.fd === 2, `invalid handle for stderr (${stderr.fd})`);
      },
  staticInit() {
        // Some errors may happen quite a bit, to avoid overhead we reuse them (and suffer a lack of stack info)
        [44].forEach((code) => {
          FS.genericErrors[code] = new FS.ErrnoError(code);
          FS.genericErrors[code].stack = '<generic error, no stack>';
        });
  
        FS.nameTable = new Array(4096);
  
        FS.mount(MEMFS, {}, '/');
  
        FS.createDefaultDirectories();
        FS.createDefaultDevices();
        FS.createSpecialDirectories();
  
        FS.filesystems = {
          'MEMFS': MEMFS,
        };
      },
  init(input, output, error) {
        assert(!FS.init.initialized, 'FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)');
        FS.init.initialized = true;
  
        // Allow Module.stdin etc. to provide defaults, if none explicitly passed to us here
        Module['stdin'] = input || Module['stdin'];
        Module['stdout'] = output || Module['stdout'];
        Module['stderr'] = error || Module['stderr'];
  
        FS.createStandardStreams();
      },
  quit() {
        FS.init.initialized = false;
        // force-flush all streams, so we get musl std streams printed out
        _fflush(0);
        // close all of our streams
        for (var i = 0; i < FS.streams.length; i++) {
          var stream = FS.streams[i];
          if (!stream) {
            continue;
          }
          FS.close(stream);
        }
      },
  findObject(path, dontResolveLastLink) {
        var ret = FS.analyzePath(path, dontResolveLastLink);
        if (!ret.exists) {
          return null;
        }
        return ret.object;
      },
  analyzePath(path, dontResolveLastLink) {
        // operate from within the context of the symlink's target
        try {
          var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          path = lookup.path;
        } catch (e) {
        }
        var ret = {
          isRoot: false, exists: false, error: 0, name: null, path: null, object: null,
          parentExists: false, parentPath: null, parentObject: null
        };
        try {
          var lookup = FS.lookupPath(path, { parent: true });
          ret.parentExists = true;
          ret.parentPath = lookup.path;
          ret.parentObject = lookup.node;
          ret.name = PATH.basename(path);
          lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          ret.exists = true;
          ret.path = lookup.path;
          ret.object = lookup.node;
          ret.name = lookup.node.name;
          ret.isRoot = lookup.path === '/';
        } catch (e) {
          ret.error = e.errno;
        };
        return ret;
      },
  createPath(parent, path, canRead, canWrite) {
        parent = typeof parent == 'string' ? parent : FS.getPath(parent);
        var parts = path.split('/').reverse();
        while (parts.length) {
          var part = parts.pop();
          if (!part) continue;
          var current = PATH.join2(parent, part);
          try {
            FS.mkdir(current);
          } catch (e) {
            // ignore EEXIST
          }
          parent = current;
        }
        return current;
      },
  createFile(parent, name, properties, canRead, canWrite) {
        var path = PATH.join2(typeof parent == 'string' ? parent : FS.getPath(parent), name);
        var mode = FS_getMode(canRead, canWrite);
        return FS.create(path, mode);
      },
  createDataFile(parent, name, data, canRead, canWrite, canOwn) {
        var path = name;
        if (parent) {
          parent = typeof parent == 'string' ? parent : FS.getPath(parent);
          path = name ? PATH.join2(parent, name) : parent;
        }
        var mode = FS_getMode(canRead, canWrite);
        var node = FS.create(path, mode);
        if (data) {
          if (typeof data == 'string') {
            var arr = new Array(data.length);
            for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
            data = arr;
          }
          // make sure we can write to the file
          FS.chmod(node, mode | 146);
          var stream = FS.open(node, 577);
          FS.write(stream, data, 0, data.length, 0, canOwn);
          FS.close(stream);
          FS.chmod(node, mode);
        }
      },
  createDevice(parent, name, input, output) {
        var path = PATH.join2(typeof parent == 'string' ? parent : FS.getPath(parent), name);
        var mode = FS_getMode(!!input, !!output);
        if (!FS.createDevice.major) FS.createDevice.major = 64;
        var dev = FS.makedev(FS.createDevice.major++, 0);
        // Create a fake device that a set of stream ops to emulate
        // the old behavior.
        FS.registerDevice(dev, {
          open(stream) {
            stream.seekable = false;
          },
          close(stream) {
            // flush any pending line data
            if (output?.buffer?.length) {
              output(10);
            }
          },
          read(stream, buffer, offset, length, pos /* ignored */) {
            var bytesRead = 0;
            for (var i = 0; i < length; i++) {
              var result;
              try {
                result = input();
              } catch (e) {
                throw new FS.ErrnoError(29);
              }
              if (result === undefined && bytesRead === 0) {
                throw new FS.ErrnoError(6);
              }
              if (result === null || result === undefined) break;
              bytesRead++;
              buffer[offset+i] = result;
            }
            if (bytesRead) {
              stream.node.timestamp = Date.now();
            }
            return bytesRead;
          },
          write(stream, buffer, offset, length, pos) {
            for (var i = 0; i < length; i++) {
              try {
                output(buffer[offset+i]);
              } catch (e) {
                throw new FS.ErrnoError(29);
              }
            }
            if (length) {
              stream.node.timestamp = Date.now();
            }
            return i;
          }
        });
        return FS.mkdev(path, mode, dev);
      },
  forceLoadFile(obj) {
        if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
        if (typeof XMLHttpRequest != 'undefined') {
          throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
        } else if (read_) {
          // Command-line.
          try {
            // WARNING: Can't read binary files in V8's d8 or tracemonkey's js, as
            //          read() will try to parse UTF8.
            obj.contents = intArrayFromString(read_(obj.url), true);
            obj.usedBytes = obj.contents.length;
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
        } else {
          throw new Error('Cannot load without read() or XMLHttpRequest.');
        }
      },
  createLazyFile(parent, name, url, canRead, canWrite) {
        // Lazy chunked Uint8Array (implements get and length from Uint8Array). Actual getting is abstracted away for eventual reuse.
        /** @constructor */
        function LazyUint8Array() {
          this.lengthKnown = false;
          this.chunks = []; // Loaded chunks. Index is the chunk number
        }
        LazyUint8Array.prototype.get = /** @this{Object} */ function LazyUint8Array_get(idx) {
          if (idx > this.length-1 || idx < 0) {
            return undefined;
          }
          var chunkOffset = idx % this.chunkSize;
          var chunkNum = (idx / this.chunkSize)|0;
          return this.getter(chunkNum)[chunkOffset];
        };
        LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
          this.getter = getter;
        };
        LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
          // Find length
          var xhr = new XMLHttpRequest();
          xhr.open('HEAD', url, false);
          xhr.send(null);
          if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
          var datalength = Number(xhr.getResponseHeader("Content-length"));
          var header;
          var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
          var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
  
          var chunkSize = 1024*1024; // Chunk size in bytes
  
          if (!hasByteServing) chunkSize = datalength;
  
          // Function to get a range from the remote URL.
          var doXHR = (from, to) => {
            if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
            if (to > datalength-1) throw new Error("only " + datalength + " bytes available! programmer error!");
  
            // TODO: Use mozResponseArrayBuffer, responseStream, etc. if available.
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, false);
            if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
  
            // Some hints to the browser that we want binary data.
            xhr.responseType = 'arraybuffer';
            if (xhr.overrideMimeType) {
              xhr.overrideMimeType('text/plain; charset=x-user-defined');
            }
  
            xhr.send(null);
            if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
            if (xhr.response !== undefined) {
              return new Uint8Array(/** @type{Array<number>} */(xhr.response || []));
            }
            return intArrayFromString(xhr.responseText || '', true);
          };
          var lazyArray = this;
          lazyArray.setDataGetter((chunkNum) => {
            var start = chunkNum * chunkSize;
            var end = (chunkNum+1) * chunkSize - 1; // including this byte
            end = Math.min(end, datalength-1); // if datalength-1 is selected, this is the last block
            if (typeof lazyArray.chunks[chunkNum] == 'undefined') {
              lazyArray.chunks[chunkNum] = doXHR(start, end);
            }
            if (typeof lazyArray.chunks[chunkNum] == 'undefined') throw new Error('doXHR failed!');
            return lazyArray.chunks[chunkNum];
          });
  
          if (usesGzip || !datalength) {
            // if the server uses gzip or doesn't supply the length, we have to download the whole file to get the (uncompressed) length
            chunkSize = datalength = 1; // this will force getter(0)/doXHR do download the whole file
            datalength = this.getter(0).length;
            chunkSize = datalength;
            out("LazyFiles on gzip forces download of the whole file when length is accessed");
          }
  
          this._length = datalength;
          this._chunkSize = chunkSize;
          this.lengthKnown = true;
        };
        if (typeof XMLHttpRequest != 'undefined') {
          if (!ENVIRONMENT_IS_WORKER) throw 'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc';
          var lazyArray = new LazyUint8Array();
          Object.defineProperties(lazyArray, {
            length: {
              get: /** @this{Object} */ function() {
                if (!this.lengthKnown) {
                  this.cacheLength();
                }
                return this._length;
              }
            },
            chunkSize: {
              get: /** @this{Object} */ function() {
                if (!this.lengthKnown) {
                  this.cacheLength();
                }
                return this._chunkSize;
              }
            }
          });
  
          var properties = { isDevice: false, contents: lazyArray };
        } else {
          var properties = { isDevice: false, url: url };
        }
  
        var node = FS.createFile(parent, name, properties, canRead, canWrite);
        // This is a total hack, but I want to get this lazy file code out of the
        // core of MEMFS. If we want to keep this lazy file concept I feel it should
        // be its own thin LAZYFS proxying calls to MEMFS.
        if (properties.contents) {
          node.contents = properties.contents;
        } else if (properties.url) {
          node.contents = null;
          node.url = properties.url;
        }
        // Add a function that defers querying the file size until it is asked the first time.
        Object.defineProperties(node, {
          usedBytes: {
            get: /** @this {FSNode} */ function() { return this.contents.length; }
          }
        });
        // override each stream op with one that tries to force load the lazy file first
        var stream_ops = {};
        var keys = Object.keys(node.stream_ops);
        keys.forEach((key) => {
          var fn = node.stream_ops[key];
          stream_ops[key] = (...args) => {
            FS.forceLoadFile(node);
            return fn(...args);
          };
        });
        function writeChunks(stream, buffer, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= contents.length)
            return 0;
          var size = Math.min(contents.length - position, length);
          assert(size >= 0);
          if (contents.slice) { // normal array
            for (var i = 0; i < size; i++) {
              buffer[offset + i] = contents[position + i];
            }
          } else {
            for (var i = 0; i < size; i++) { // LazyUint8Array from sync binary XHR
              buffer[offset + i] = contents.get(position + i);
            }
          }
          return size;
        }
        // use a custom read function
        stream_ops.read = (stream, buffer, offset, length, position) => {
          FS.forceLoadFile(node);
          return writeChunks(stream, buffer, offset, length, position)
        };
        // use a custom mmap function
        stream_ops.mmap = (stream, length, position, prot, flags) => {
          FS.forceLoadFile(node);
          var ptr = mmapAlloc(length);
          if (!ptr) {
            throw new FS.ErrnoError(48);
          }
          writeChunks(stream, HEAP8, ptr, length, position);
          return { ptr, allocated: true };
        };
        node.stream_ops = stream_ops;
        return node;
      },
  absolutePath() {
        abort('FS.absolutePath has been removed; use PATH_FS.resolve instead');
      },
  createFolder() {
        abort('FS.createFolder has been removed; use FS.mkdir instead');
      },
  createLink() {
        abort('FS.createLink has been removed; use FS.symlink instead');
      },
  joinPath() {
        abort('FS.joinPath has been removed; use PATH.join instead');
      },
  mmapAlloc() {
        abort('FS.mmapAlloc has been replaced by the top level function mmapAlloc');
      },
  standardizePath() {
        abort('FS.standardizePath has been removed; use PATH.normalize instead');
      },
  };
  
  var SYSCALLS = {
  DEFAULT_POLLMASK:5,
  calculateAt(dirfd, path, allowEmpty) {
        if (PATH.isAbs(path)) {
          return path;
        }
        // relative path
        var dir;
        if (dirfd === -100) {
          dir = FS.cwd();
        } else {
          var dirstream = SYSCALLS.getStreamFromFD(dirfd);
          dir = dirstream.path;
        }
        if (path.length == 0) {
          if (!allowEmpty) {
            throw new FS.ErrnoError(44);;
          }
          return dir;
        }
        return PATH.join2(dir, path);
      },
  doStat(func, path, buf) {
        var stat = func(path);
        HEAP32[((buf)>>2)] = stat.dev;
        HEAP32[(((buf)+(4))>>2)] = stat.mode;
        HEAPU32[(((buf)+(8))>>2)] = stat.nlink;
        HEAP32[(((buf)+(12))>>2)] = stat.uid;
        HEAP32[(((buf)+(16))>>2)] = stat.gid;
        HEAP32[(((buf)+(20))>>2)] = stat.rdev;
        (tempI64 = [stat.size>>>0,(tempDouble = stat.size,(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? (+(Math.floor((tempDouble)/4294967296.0)))>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)], HEAP32[(((buf)+(24))>>2)] = tempI64[0],HEAP32[(((buf)+(28))>>2)] = tempI64[1]);
        HEAP32[(((buf)+(32))>>2)] = 4096;
        HEAP32[(((buf)+(36))>>2)] = stat.blocks;
        var atime = stat.atime.getTime();
        var mtime = stat.mtime.getTime();
        var ctime = stat.ctime.getTime();
        (tempI64 = [Math.floor(atime / 1000)>>>0,(tempDouble = Math.floor(atime / 1000),(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? (+(Math.floor((tempDouble)/4294967296.0)))>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)], HEAP32[(((buf)+(40))>>2)] = tempI64[0],HEAP32[(((buf)+(44))>>2)] = tempI64[1]);
        HEAPU32[(((buf)+(48))>>2)] = (atime % 1000) * 1000;
        (tempI64 = [Math.floor(mtime / 1000)>>>0,(tempDouble = Math.floor(mtime / 1000),(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? (+(Math.floor((tempDouble)/4294967296.0)))>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)], HEAP32[(((buf)+(56))>>2)] = tempI64[0],HEAP32[(((buf)+(60))>>2)] = tempI64[1]);
        HEAPU32[(((buf)+(64))>>2)] = (mtime % 1000) * 1000;
        (tempI64 = [Math.floor(ctime / 1000)>>>0,(tempDouble = Math.floor(ctime / 1000),(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? (+(Math.floor((tempDouble)/4294967296.0)))>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)], HEAP32[(((buf)+(72))>>2)] = tempI64[0],HEAP32[(((buf)+(76))>>2)] = tempI64[1]);
        HEAPU32[(((buf)+(80))>>2)] = (ctime % 1000) * 1000;
        (tempI64 = [stat.ino>>>0,(tempDouble = stat.ino,(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? (+(Math.floor((tempDouble)/4294967296.0)))>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)], HEAP32[(((buf)+(88))>>2)] = tempI64[0],HEAP32[(((buf)+(92))>>2)] = tempI64[1]);
        return 0;
      },
  doMsync(addr, stream, len, flags, offset) {
        if (!FS.isFile(stream.node.mode)) {
          throw new FS.ErrnoError(43);
        }
        if (flags & 2) {
          // MAP_PRIVATE calls need not to be synced back to underlying fs
          return 0;
        }
        var buffer = HEAPU8.slice(addr, addr + len);
        FS.msync(stream, buffer, offset, len, flags);
      },
  varargs:undefined,
  get() {
        assert(SYSCALLS.varargs != undefined);
        // the `+` prepended here is necessary to convince the JSCompiler that varargs is indeed a number.
        var ret = HEAP32[((+SYSCALLS.varargs)>>2)];
        SYSCALLS.varargs += 4;
        return ret;
      },
  getp() { return SYSCALLS.get() },
  getStr(ptr) {
        var ret = UTF8ToString(ptr);
        return ret;
      },
  getStreamFromFD(fd) {
        var stream = FS.getStreamChecked(fd);
        return stream;
      },
  };
  function ___syscall_fcntl64(fd, cmd, varargs) {
  SYSCALLS.varargs = varargs;
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      switch (cmd) {
        case 0: {
          var arg = SYSCALLS.get();
          if (arg < 0) {
            return -28;
          }
          while (FS.streams[arg]) {
            arg++;
          }
          var newStream;
          newStream = FS.createStream(stream, arg);
          return newStream.fd;
        }
        case 1:
        case 2:
          return 0;  // FD_CLOEXEC makes no sense for a single process.
        case 3:
          return stream.flags;
        case 4: {
          var arg = SYSCALLS.get();
          stream.flags |= arg;
          return 0;
        }
        case 12: {
          var arg = SYSCALLS.getp();
          var offset = 0;
          // We're always unlocked.
          HEAP16[(((arg)+(offset))>>1)] = 2;
          return 0;
        }
        case 13:
        case 14:
          return 0; // Pretend that the locking is successful.
      }
      return -28;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }

  function ___syscall_fstat64(fd, buf) {
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      return SYSCALLS.doStat(FS.stat, stream.path, buf);
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }

  var stringToUTF8 = (str, outPtr, maxBytesToWrite) => {
      assert(typeof maxBytesToWrite == 'number', 'stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
      return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
    };
  
  function ___syscall_getdents64(fd, dirp, count) {
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd)
      stream.getdents ||= FS.readdir(stream.path);
  
      var struct_size = 280;
      var pos = 0;
      var off = FS.llseek(stream, 0, 1);
  
      var idx = Math.floor(off / struct_size);
  
      while (idx < stream.getdents.length && pos + struct_size <= count) {
        var id;
        var type;
        var name = stream.getdents[idx];
        if (name === '.') {
          id = stream.node.id;
          type = 4; // DT_DIR
        }
        else if (name === '..') {
          var lookup = FS.lookupPath(stream.path, { parent: true });
          id = lookup.node.id;
          type = 4; // DT_DIR
        }
        else {
          var child = FS.lookupNode(stream.node, name);
          id = child.id;
          type = FS.isChrdev(child.mode) ? 2 :  // DT_CHR, character device.
                 FS.isDir(child.mode) ? 4 :     // DT_DIR, directory.
                 FS.isLink(child.mode) ? 10 :   // DT_LNK, symbolic link.
                 8;                             // DT_REG, regular file.
        }
        assert(id);
        (tempI64 = [id>>>0,(tempDouble = id,(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? (+(Math.floor((tempDouble)/4294967296.0)))>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)], HEAP32[((dirp + pos)>>2)] = tempI64[0],HEAP32[(((dirp + pos)+(4))>>2)] = tempI64[1]);
        (tempI64 = [(idx + 1) * struct_size>>>0,(tempDouble = (idx + 1) * struct_size,(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? (+(Math.floor((tempDouble)/4294967296.0)))>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)], HEAP32[(((dirp + pos)+(8))>>2)] = tempI64[0],HEAP32[(((dirp + pos)+(12))>>2)] = tempI64[1]);
        HEAP16[(((dirp + pos)+(16))>>1)] = 280;
        HEAP8[(dirp + pos)+(18)] = type;
        stringToUTF8(name, dirp + pos + 19, 256);
        pos += struct_size;
        idx += 1;
      }
      FS.llseek(stream, idx * struct_size, 0);
      return pos;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }

  function ___syscall_ioctl(fd, op, varargs) {
  SYSCALLS.varargs = varargs;
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      switch (op) {
        case 21509: {
          if (!stream.tty) return -59;
          return 0;
        }
        case 21505: {
          if (!stream.tty) return -59;
          if (stream.tty.ops.ioctl_tcgets) {
            var termios = stream.tty.ops.ioctl_tcgets(stream);
            var argp = SYSCALLS.getp();
            HEAP32[((argp)>>2)] = termios.c_iflag || 0;
            HEAP32[(((argp)+(4))>>2)] = termios.c_oflag || 0;
            HEAP32[(((argp)+(8))>>2)] = termios.c_cflag || 0;
            HEAP32[(((argp)+(12))>>2)] = termios.c_lflag || 0;
            for (var i = 0; i < 32; i++) {
              HEAP8[(argp + i)+(17)] = termios.c_cc[i] || 0;
            }
            return 0;
          }
          return 0;
        }
        case 21510:
        case 21511:
        case 21512: {
          if (!stream.tty) return -59;
          return 0; // no-op, not actually adjusting terminal settings
        }
        case 21506:
        case 21507:
        case 21508: {
          if (!stream.tty) return -59;
          if (stream.tty.ops.ioctl_tcsets) {
            var argp = SYSCALLS.getp();
            var c_iflag = HEAP32[((argp)>>2)];
            var c_oflag = HEAP32[(((argp)+(4))>>2)];
            var c_cflag = HEAP32[(((argp)+(8))>>2)];
            var c_lflag = HEAP32[(((argp)+(12))>>2)];
            var c_cc = []
            for (var i = 0; i < 32; i++) {
              c_cc.push(HEAP8[(argp + i)+(17)]);
            }
            return stream.tty.ops.ioctl_tcsets(stream.tty, op, { c_iflag, c_oflag, c_cflag, c_lflag, c_cc });
          }
          return 0; // no-op, not actually adjusting terminal settings
        }
        case 21519: {
          if (!stream.tty) return -59;
          var argp = SYSCALLS.getp();
          HEAP32[((argp)>>2)] = 0;
          return 0;
        }
        case 21520: {
          if (!stream.tty) return -59;
          return -28; // not supported
        }
        case 21531: {
          var argp = SYSCALLS.getp();
          return FS.ioctl(stream, op, argp);
        }
        case 21523: {
          // TODO: in theory we should write to the winsize struct that gets
          // passed in, but for now musl doesn't read anything on it
          if (!stream.tty) return -59;
          if (stream.tty.ops.ioctl_tiocgwinsz) {
            var winsize = stream.tty.ops.ioctl_tiocgwinsz(stream.tty);
            var argp = SYSCALLS.getp();
            HEAP16[((argp)>>1)] = winsize[0];
            HEAP16[(((argp)+(2))>>1)] = winsize[1];
          }
          return 0;
        }
        case 21524: {
          // TODO: technically, this ioctl call should change the window size.
          // but, since emscripten doesn't have any concept of a terminal window
          // yet, we'll just silently throw it away as we do TIOCGWINSZ
          if (!stream.tty) return -59;
          return 0;
        }
        case 21515: {
          if (!stream.tty) return -59;
          return 0;
        }
        default: return -28; // not supported
      }
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }

  function ___syscall_lstat64(path, buf) {
  try {
  
      path = SYSCALLS.getStr(path);
      return SYSCALLS.doStat(FS.lstat, path, buf);
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }

  function ___syscall_mkdirat(dirfd, path, mode) {
  try {
  
      path = SYSCALLS.getStr(path);
      path = SYSCALLS.calculateAt(dirfd, path);
      // remove a trailing slash, if one - /a/b/ has basename of '', but
      // we want to create b in the context of this function
      path = PATH.normalize(path);
      if (path[path.length-1] === '/') path = path.substr(0, path.length-1);
      FS.mkdir(path, mode, 0);
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }

  function ___syscall_newfstatat(dirfd, path, buf, flags) {
  try {
  
      path = SYSCALLS.getStr(path);
      var nofollow = flags & 256;
      var allowEmpty = flags & 4096;
      flags = flags & (~6400);
      assert(!flags, `unknown flags in __syscall_newfstatat: ${flags}`);
      path = SYSCALLS.calculateAt(dirfd, path, allowEmpty);
      return SYSCALLS.doStat(nofollow ? FS.lstat : FS.stat, path, buf);
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }

  function ___syscall_openat(dirfd, path, flags, varargs) {
  SYSCALLS.varargs = varargs;
  try {
  
      path = SYSCALLS.getStr(path);
      path = SYSCALLS.calculateAt(dirfd, path);
      var mode = varargs ? SYSCALLS.get() : 0;
      return FS.open(path, flags, mode).fd;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }

  function ___syscall_stat64(path, buf) {
  try {
  
      path = SYSCALLS.getStr(path);
      return SYSCALLS.doStat(FS.stat, path, buf);
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }

  function __emscripten_fetch_free(id) {
    if (Fetch.xhrs.has(id)) {
      var xhr = Fetch.xhrs.get(id);
      Fetch.xhrs.free(id);
      // check if fetch is still in progress and should be aborted
      if (xhr.readyState > 0 && xhr.readyState < 4) {
        xhr.abort();
      }
    }
  }

  var nowIsMonotonic = 1;
  var __emscripten_get_now_is_monotonic = () => nowIsMonotonic;

  
  
  
  
  
  var convertI32PairToI53Checked = (lo, hi) => {
      assert(lo == (lo >>> 0) || lo == (lo|0)); // lo should either be a i32 or a u32
      assert(hi === (hi|0));                    // hi should be a i32
      return ((hi + 0x200000) >>> 0 < 0x400001 - !!lo) ? (lo >>> 0) + hi * 4294967296 : NaN;
    };
  function __mmap_js(len,prot,flags,fd,offset_low, offset_high,allocated,addr) {
    var offset = convertI32PairToI53Checked(offset_low, offset_high);;
  
    
  try {
  
      if (isNaN(offset)) return 61;
      var stream = SYSCALLS.getStreamFromFD(fd);
      var res = FS.mmap(stream, len, offset, prot, flags);
      var ptr = res.ptr;
      HEAP32[((allocated)>>2)] = res.allocated;
      HEAPU32[((addr)>>2)] = ptr;
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  ;
  }

  
  function __munmap_js(addr,len,prot,flags,fd,offset_low, offset_high) {
    var offset = convertI32PairToI53Checked(offset_low, offset_high);;
  
    
  try {
  
      if (isNaN(offset)) return 61;
      var stream = SYSCALLS.getStreamFromFD(fd);
      if (prot & 2) {
        SYSCALLS.doMsync(addr, stream, len, flags, offset);
      }
      FS.munmap(stream);
      // implicitly return 0
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  ;
  }

  var _emscripten_set_main_loop_timing = (mode, value) => {
      Browser.mainLoop.timingMode = mode;
      Browser.mainLoop.timingValue = value;
  
      if (!Browser.mainLoop.func) {
        err('emscripten_set_main_loop_timing: Cannot set timing mode for main loop since a main loop does not exist! Call emscripten_set_main_loop first to set one up.');
        return 1; // Return non-zero on failure, can't set timing mode when there is no main loop.
      }
  
      if (!Browser.mainLoop.running) {
        
        Browser.mainLoop.running = true;
      }
      if (mode == 0) {
        Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_setTimeout() {
          var timeUntilNextTick = Math.max(0, Browser.mainLoop.tickStartTime + value - _emscripten_get_now())|0;
          setTimeout(Browser.mainLoop.runner, timeUntilNextTick); // doing this each time means that on exception, we stop
        };
        Browser.mainLoop.method = 'timeout';
      } else if (mode == 1) {
        Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_rAF() {
          Browser.requestAnimationFrame(Browser.mainLoop.runner);
        };
        Browser.mainLoop.method = 'rAF';
      } else if (mode == 2) {
        if (typeof Browser.setImmediate == 'undefined') {
          if (typeof setImmediate == 'undefined') {
            // Emulate setImmediate. (note: not a complete polyfill, we don't emulate clearImmediate() to keep code size to minimum, since not needed)
            var setImmediates = [];
            var emscriptenMainLoopMessageId = 'setimmediate';
            /** @param {Event} event */
            var Browser_setImmediate_messageHandler = (event) => {
              // When called in current thread or Worker, the main loop ID is structured slightly different to accommodate for --proxy-to-worker runtime listening to Worker events,
              // so check for both cases.
              if (event.data === emscriptenMainLoopMessageId || event.data.target === emscriptenMainLoopMessageId) {
                event.stopPropagation();
                setImmediates.shift()();
              }
            };
            addEventListener("message", Browser_setImmediate_messageHandler, true);
            Browser.setImmediate = /** @type{function(function(): ?, ...?): number} */(function Browser_emulated_setImmediate(func) {
              setImmediates.push(func);
              if (ENVIRONMENT_IS_WORKER) {
                if (Module['setImmediates'] === undefined) Module['setImmediates'] = [];
                Module['setImmediates'].push(func);
                postMessage({target: emscriptenMainLoopMessageId}); // In --proxy-to-worker, route the message via proxyClient.js
              } else postMessage(emscriptenMainLoopMessageId, "*"); // On the main thread, can just send the message to itself.
            });
          } else {
            Browser.setImmediate = setImmediate;
          }
        }
        Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_setImmediate() {
          Browser.setImmediate(Browser.mainLoop.runner);
        };
        Browser.mainLoop.method = 'immediate';
      }
      return 0;
    };
  
  var _emscripten_get_now;
      // Modern environment where performance.now() is supported:
      // N.B. a shorter form "_emscripten_get_now = performance.now;" is
      // unfortunately not allowed even in current browsers (e.g. FF Nightly 75).
      _emscripten_get_now = () => performance.now();
  ;
  
  
    /**
     * @param {number=} arg
     * @param {boolean=} noSetTiming
     */
  var setMainLoop = (browserIterationFunc, fps, simulateInfiniteLoop, arg, noSetTiming) => {
      assert(!Browser.mainLoop.func, 'emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.');
  
      Browser.mainLoop.func = browserIterationFunc;
      Browser.mainLoop.arg = arg;
  
      // Closure compiler bug(?): Closure does not see that the assignment
      //   var thisMainLoopId = Browser.mainLoop.currentlyRunningMainloop
      // is a value copy of a number (even with the JSDoc @type annotation)
      // but optimizeis the code as if the assignment was a reference assignment,
      // which results in Browser.mainLoop.pause() not working. Hence use a
      // workaround to make Closure believe this is a value copy that should occur:
      // (TODO: Minimize this down to a small test case and report - was unable
      // to reproduce in a small written test case)
      /** @type{number} */
      var thisMainLoopId = (() => Browser.mainLoop.currentlyRunningMainloop)();
      function checkIsRunning() {
        if (thisMainLoopId < Browser.mainLoop.currentlyRunningMainloop) {
          
          return false;
        }
        return true;
      }
  
      // We create the loop runner here but it is not actually running until
      // _emscripten_set_main_loop_timing is called (which might happen a
      // later time).  This member signifies that the current runner has not
      // yet been started so that we can call runtimeKeepalivePush when it
      // gets it timing set for the first time.
      Browser.mainLoop.running = false;
      Browser.mainLoop.runner = function Browser_mainLoop_runner() {
        if (ABORT) return;
        if (Browser.mainLoop.queue.length > 0) {
          var start = Date.now();
          var blocker = Browser.mainLoop.queue.shift();
          blocker.func(blocker.arg);
          if (Browser.mainLoop.remainingBlockers) {
            var remaining = Browser.mainLoop.remainingBlockers;
            var next = remaining%1 == 0 ? remaining-1 : Math.floor(remaining);
            if (blocker.counted) {
              Browser.mainLoop.remainingBlockers = next;
            } else {
              // not counted, but move the progress along a tiny bit
              next = next + 0.5; // do not steal all the next one's progress
              Browser.mainLoop.remainingBlockers = (8*remaining + next)/9;
            }
          }
          Browser.mainLoop.updateStatus();
  
          // catches pause/resume main loop from blocker execution
          if (!checkIsRunning()) return;
  
          setTimeout(Browser.mainLoop.runner, 0);
          return;
        }
  
        // catch pauses from non-main loop sources
        if (!checkIsRunning()) return;
  
        // Implement very basic swap interval control
        Browser.mainLoop.currentFrameNumber = Browser.mainLoop.currentFrameNumber + 1 | 0;
        if (Browser.mainLoop.timingMode == 1 && Browser.mainLoop.timingValue > 1 && Browser.mainLoop.currentFrameNumber % Browser.mainLoop.timingValue != 0) {
          // Not the scheduled time to render this frame - skip.
          Browser.mainLoop.scheduler();
          return;
        } else if (Browser.mainLoop.timingMode == 0) {
          Browser.mainLoop.tickStartTime = _emscripten_get_now();
        }
  
        // Signal GL rendering layer that processing of a new frame is about to start. This helps it optimize
        // VBO double-buffering and reduce GPU stalls.
        GL.newRenderingFrameStarted();
  
        if (Browser.mainLoop.method === 'timeout' && Module.ctx) {
          warnOnce('Looks like you are rendering without using requestAnimationFrame for the main loop. You should use 0 for the frame rate in emscripten_set_main_loop in order to use requestAnimationFrame, as that can greatly improve your frame rates!');
          Browser.mainLoop.method = ''; // just warn once per call to set main loop
        }
  
        Browser.mainLoop.runIter(browserIterationFunc);
  
        checkStackCookie();
  
        // catch pauses from the main loop itself
        if (!checkIsRunning()) return;
  
        // Queue new audio data. This is important to be right after the main loop invocation, so that we will immediately be able
        // to queue the newest produced audio samples.
        // TODO: Consider adding pre- and post- rAF callbacks so that GL.newRenderingFrameStarted() and SDL.audio.queueNewAudioData()
        //       do not need to be hardcoded into this function, but can be more generic.
        if (typeof SDL == 'object') SDL.audio?.queueNewAudioData?.();
  
        Browser.mainLoop.scheduler();
      }
  
      if (!noSetTiming) {
        if (fps && fps > 0) {
          _emscripten_set_main_loop_timing(0, 1000.0 / fps);
        } else {
          // Do rAF by rendering each frame (no decimating)
          _emscripten_set_main_loop_timing(1, 1);
        }
  
        Browser.mainLoop.scheduler();
      }
  
      if (simulateInfiniteLoop) {
        throw 'unwind';
      }
    };
  
  var handleException = (e) => {
      // Certain exception types we do not treat as errors since they are used for
      // internal control flow.
      // 1. ExitStatus, which is thrown by exit()
      // 2. "unwind", which is thrown by emscripten_unwind_to_js_event_loop() and others
      //    that wish to return to JS event loop.
      if (e instanceof ExitStatus || e == 'unwind') {
        return EXITSTATUS;
      }
      checkStackCookie();
      if (e instanceof WebAssembly.RuntimeError) {
        if (_emscripten_stack_get_current() <= 0) {
          err('Stack overflow detected.  You can try increasing -sSTACK_SIZE (currently set to 65536)');
        }
      }
      quit_(1, e);
    };
  
  
  var runtimeKeepaliveCounter = 0;
  var keepRuntimeAlive = () => noExitRuntime || runtimeKeepaliveCounter > 0;
  var _proc_exit = (code) => {
      EXITSTATUS = code;
      if (!keepRuntimeAlive()) {
        Module['onExit']?.(code);
        ABORT = true;
      }
      quit_(code, new ExitStatus(code));
    };
  
  /** @suppress {duplicate } */
  /** @param {boolean|number=} implicit */
  var exitJS = (status, implicit) => {
      EXITSTATUS = status;
  
      checkUnflushedContent();
  
      // if exit() was called explicitly, warn the user if the runtime isn't actually being shut down
      if (keepRuntimeAlive() && !implicit) {
        var msg = `program exited (with status: ${status}), but keepRuntimeAlive() is set (counter=${runtimeKeepaliveCounter}) due to an async operation, so halting execution but not exiting the runtime or preventing further async execution (you can use emscripten_force_exit, if you want to force a true shutdown)`;
        err(msg);
      }
  
      _proc_exit(status);
    };
  var _exit = exitJS;
  
  
  var maybeExit = () => {
      if (!keepRuntimeAlive()) {
        try {
          _exit(EXITSTATUS);
        } catch (e) {
          handleException(e);
        }
      }
    };
  var callUserCallback = (func) => {
      if (ABORT) {
        err('user callback triggered after runtime exited or application aborted.  Ignoring.');
        return;
      }
      try {
        func();
        maybeExit();
      } catch (e) {
        handleException(e);
      }
    };
  
  /** @param {number=} timeout */
  var safeSetTimeout = (func, timeout) => {
      
      return setTimeout(() => {
        
        callUserCallback(func);
      }, timeout);
    };
  
  
  
  
  var Browser = {
  mainLoop:{
  running:false,
  scheduler:null,
  method:"",
  currentlyRunningMainloop:0,
  func:null,
  arg:0,
  timingMode:0,
  timingValue:0,
  currentFrameNumber:0,
  queue:[],
  pause() {
          Browser.mainLoop.scheduler = null;
          // Incrementing this signals the previous main loop that it's now become old, and it must return.
          Browser.mainLoop.currentlyRunningMainloop++;
        },
  resume() {
          Browser.mainLoop.currentlyRunningMainloop++;
          var timingMode = Browser.mainLoop.timingMode;
          var timingValue = Browser.mainLoop.timingValue;
          var func = Browser.mainLoop.func;
          Browser.mainLoop.func = null;
          // do not set timing and call scheduler, we will do it on the next lines
          setMainLoop(func, 0, false, Browser.mainLoop.arg, true);
          _emscripten_set_main_loop_timing(timingMode, timingValue);
          Browser.mainLoop.scheduler();
        },
  updateStatus() {
          if (Module['setStatus']) {
            var message = Module['statusMessage'] || 'Please wait...';
            var remaining = Browser.mainLoop.remainingBlockers;
            var expected = Browser.mainLoop.expectedBlockers;
            if (remaining) {
              if (remaining < expected) {
                Module['setStatus'](`{message} ({expected - remaining}/{expected})`);
              } else {
                Module['setStatus'](message);
              }
            } else {
              Module['setStatus']('');
            }
          }
        },
  runIter(func) {
          if (ABORT) return;
          if (Module['preMainLoop']) {
            var preRet = Module['preMainLoop']();
            if (preRet === false) {
              return; // |return false| skips a frame
            }
          }
          callUserCallback(func);
          Module['postMainLoop']?.();
        },
  },
  isFullscreen:false,
  pointerLock:false,
  moduleContextCreatedCallbacks:[],
  workers:[],
  init() {
        if (Browser.initted) return;
        Browser.initted = true;
  
        // Support for plugins that can process preloaded files. You can add more of these to
        // your app by creating and appending to preloadPlugins.
        //
        // Each plugin is asked if it can handle a file based on the file's name. If it can,
        // it is given the file's raw data. When it is done, it calls a callback with the file's
        // (possibly modified) data. For example, a plugin might decompress a file, or it
        // might create some side data structure for use later (like an Image element, etc.).
  
        var imagePlugin = {};
        imagePlugin['canHandle'] = function imagePlugin_canHandle(name) {
          return !Module.noImageDecoding && /\.(jpg|jpeg|png|bmp)$/i.test(name);
        };
        imagePlugin['handle'] = function imagePlugin_handle(byteArray, name, onload, onerror) {
          var b = new Blob([byteArray], { type: Browser.getMimetype(name) });
          if (b.size !== byteArray.length) { // Safari bug #118630
            // Safari's Blob can only take an ArrayBuffer
            b = new Blob([(new Uint8Array(byteArray)).buffer], { type: Browser.getMimetype(name) });
          }
          var url = URL.createObjectURL(b);
          assert(typeof url == 'string', 'createObjectURL must return a url as a string');
          var img = new Image();
          img.onload = () => {
            assert(img.complete, `Image ${name} could not be decoded`);
            var canvas = /** @type {!HTMLCanvasElement} */ (document.createElement('canvas'));
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            preloadedImages[name] = canvas;
            URL.revokeObjectURL(url);
            onload?.(byteArray);
          };
          img.onerror = (event) => {
            err(`Image ${url} could not be decoded`);
            onerror?.();
          };
          img.src = url;
        };
        preloadPlugins.push(imagePlugin);
  
        var audioPlugin = {};
        audioPlugin['canHandle'] = function audioPlugin_canHandle(name) {
          return !Module.noAudioDecoding && name.substr(-4) in { '.ogg': 1, '.wav': 1, '.mp3': 1 };
        };
        audioPlugin['handle'] = function audioPlugin_handle(byteArray, name, onload, onerror) {
          var done = false;
          function finish(audio) {
            if (done) return;
            done = true;
            preloadedAudios[name] = audio;
            onload?.(byteArray);
          }
          function fail() {
            if (done) return;
            done = true;
            preloadedAudios[name] = new Audio(); // empty shim
            onerror?.();
          }
          var b = new Blob([byteArray], { type: Browser.getMimetype(name) });
          var url = URL.createObjectURL(b); // XXX we never revoke this!
          assert(typeof url == 'string', 'createObjectURL must return a url as a string');
          var audio = new Audio();
          audio.addEventListener('canplaythrough', () => finish(audio), false); // use addEventListener due to chromium bug 124926
          audio.onerror = function audio_onerror(event) {
            if (done) return;
            err(`warning: browser could not fully decode audio ${name}, trying slower base64 approach`);
            function encode64(data) {
              var BASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
              var PAD = '=';
              var ret = '';
              var leftchar = 0;
              var leftbits = 0;
              for (var i = 0; i < data.length; i++) {
                leftchar = (leftchar << 8) | data[i];
                leftbits += 8;
                while (leftbits >= 6) {
                  var curr = (leftchar >> (leftbits-6)) & 0x3f;
                  leftbits -= 6;
                  ret += BASE[curr];
                }
              }
              if (leftbits == 2) {
                ret += BASE[(leftchar&3) << 4];
                ret += PAD + PAD;
              } else if (leftbits == 4) {
                ret += BASE[(leftchar&0xf) << 2];
                ret += PAD;
              }
              return ret;
            }
            audio.src = 'data:audio/x-' + name.substr(-3) + ';base64,' + encode64(byteArray);
            finish(audio); // we don't wait for confirmation this worked - but it's worth trying
          };
          audio.src = url;
          // workaround for chrome bug 124926 - we do not always get oncanplaythrough or onerror
          safeSetTimeout(() => {
            finish(audio); // try to use it even though it is not necessarily ready to play
          }, 10000);
        };
        preloadPlugins.push(audioPlugin);
  
        // Canvas event setup
  
        function pointerLockChange() {
          Browser.pointerLock = document['pointerLockElement'] === Module['canvas'] ||
                                document['mozPointerLockElement'] === Module['canvas'] ||
                                document['webkitPointerLockElement'] === Module['canvas'] ||
                                document['msPointerLockElement'] === Module['canvas'];
        }
        var canvas = Module['canvas'];
        if (canvas) {
          // forced aspect ratio can be enabled by defining 'forcedAspectRatio' on Module
          // Module['forcedAspectRatio'] = 4 / 3;
  
          canvas.requestPointerLock = canvas['requestPointerLock'] ||
                                      canvas['mozRequestPointerLock'] ||
                                      canvas['webkitRequestPointerLock'] ||
                                      canvas['msRequestPointerLock'] ||
                                      (() => {});
          canvas.exitPointerLock = document['exitPointerLock'] ||
                                   document['mozExitPointerLock'] ||
                                   document['webkitExitPointerLock'] ||
                                   document['msExitPointerLock'] ||
                                   (() => {}); // no-op if function does not exist
          canvas.exitPointerLock = canvas.exitPointerLock.bind(document);
  
          document.addEventListener('pointerlockchange', pointerLockChange, false);
          document.addEventListener('mozpointerlockchange', pointerLockChange, false);
          document.addEventListener('webkitpointerlockchange', pointerLockChange, false);
          document.addEventListener('mspointerlockchange', pointerLockChange, false);
  
          if (Module['elementPointerLock']) {
            canvas.addEventListener("click", (ev) => {
              if (!Browser.pointerLock && Module['canvas'].requestPointerLock) {
                Module['canvas'].requestPointerLock();
                ev.preventDefault();
              }
            }, false);
          }
        }
      },
  createContext(/** @type {HTMLCanvasElement} */ canvas, useWebGL, setInModule, webGLContextAttributes) {
        if (useWebGL && Module.ctx && canvas == Module.canvas) return Module.ctx; // no need to recreate GL context if it's already been created for this canvas.
  
        var ctx;
        var contextHandle;
        if (useWebGL) {
          // For GLES2/desktop GL compatibility, adjust a few defaults to be different to WebGL defaults, so that they align better with the desktop defaults.
          var contextAttributes = {
            antialias: false,
            alpha: false,
            majorVersion: (typeof WebGL2RenderingContext != 'undefined') ? 2 : 1,
          };
  
          if (webGLContextAttributes) {
            for (var attribute in webGLContextAttributes) {
              contextAttributes[attribute] = webGLContextAttributes[attribute];
            }
          }
  
          // This check of existence of GL is here to satisfy Closure compiler, which yells if variable GL is referenced below but GL object is not
          // actually compiled in because application is not doing any GL operations. TODO: Ideally if GL is not being used, this function
          // Browser.createContext() should not even be emitted.
          if (typeof GL != 'undefined') {
            contextHandle = GL.createContext(canvas, contextAttributes);
            if (contextHandle) {
              ctx = GL.getContext(contextHandle).GLctx;
            }
          }
        } else {
          ctx = canvas.getContext('2d');
        }
  
        if (!ctx) return null;
  
        if (setInModule) {
          if (!useWebGL) assert(typeof GLctx == 'undefined', 'cannot set in module if GLctx is used, but we are a non-GL context that would replace it');
  
          Module.ctx = ctx;
          if (useWebGL) GL.makeContextCurrent(contextHandle);
          Module.useWebGL = useWebGL;
          Browser.moduleContextCreatedCallbacks.forEach((callback) => callback());
          Browser.init();
        }
        return ctx;
      },
  destroyContext(canvas, useWebGL, setInModule) {},
  fullscreenHandlersInstalled:false,
  lockPointer:undefined,
  resizeCanvas:undefined,
  requestFullscreen(lockPointer, resizeCanvas) {
        Browser.lockPointer = lockPointer;
        Browser.resizeCanvas = resizeCanvas;
        if (typeof Browser.lockPointer == 'undefined') Browser.lockPointer = true;
        if (typeof Browser.resizeCanvas == 'undefined') Browser.resizeCanvas = false;
  
        var canvas = Module['canvas'];
        function fullscreenChange() {
          Browser.isFullscreen = false;
          var canvasContainer = canvas.parentNode;
          if ((document['fullscreenElement'] || document['mozFullScreenElement'] ||
               document['msFullscreenElement'] || document['webkitFullscreenElement'] ||
               document['webkitCurrentFullScreenElement']) === canvasContainer) {
            canvas.exitFullscreen = Browser.exitFullscreen;
            if (Browser.lockPointer) canvas.requestPointerLock();
            Browser.isFullscreen = true;
            if (Browser.resizeCanvas) {
              Browser.setFullscreenCanvasSize();
            } else {
              Browser.updateCanvasDimensions(canvas);
            }
          } else {
            // remove the full screen specific parent of the canvas again to restore the HTML structure from before going full screen
            canvasContainer.parentNode.insertBefore(canvas, canvasContainer);
            canvasContainer.parentNode.removeChild(canvasContainer);
  
            if (Browser.resizeCanvas) {
              Browser.setWindowedCanvasSize();
            } else {
              Browser.updateCanvasDimensions(canvas);
            }
          }
          Module['onFullScreen']?.(Browser.isFullscreen);
          Module['onFullscreen']?.(Browser.isFullscreen);
        }
  
        if (!Browser.fullscreenHandlersInstalled) {
          Browser.fullscreenHandlersInstalled = true;
          document.addEventListener('fullscreenchange', fullscreenChange, false);
          document.addEventListener('mozfullscreenchange', fullscreenChange, false);
          document.addEventListener('webkitfullscreenchange', fullscreenChange, false);
          document.addEventListener('MSFullscreenChange', fullscreenChange, false);
        }
  
        // create a new parent to ensure the canvas has no siblings. this allows browsers to optimize full screen performance when its parent is the full screen root
        var canvasContainer = document.createElement("div");
        canvas.parentNode.insertBefore(canvasContainer, canvas);
        canvasContainer.appendChild(canvas);
  
        // use parent of canvas as full screen root to allow aspect ratio correction (Firefox stretches the root to screen size)
        canvasContainer.requestFullscreen = canvasContainer['requestFullscreen'] ||
                                            canvasContainer['mozRequestFullScreen'] ||
                                            canvasContainer['msRequestFullscreen'] ||
                                           (canvasContainer['webkitRequestFullscreen'] ? () => canvasContainer['webkitRequestFullscreen'](Element['ALLOW_KEYBOARD_INPUT']) : null) ||
                                           (canvasContainer['webkitRequestFullScreen'] ? () => canvasContainer['webkitRequestFullScreen'](Element['ALLOW_KEYBOARD_INPUT']) : null);
  
        canvasContainer.requestFullscreen();
      },
  requestFullScreen() {
        abort('Module.requestFullScreen has been replaced by Module.requestFullscreen (without a capital S)');
      },
  exitFullscreen() {
        // This is workaround for chrome. Trying to exit from fullscreen
        // not in fullscreen state will cause "TypeError: Document not active"
        // in chrome. See https://github.com/emscripten-core/emscripten/pull/8236
        if (!Browser.isFullscreen) {
          return false;
        }
  
        var CFS = document['exitFullscreen'] ||
                  document['cancelFullScreen'] ||
                  document['mozCancelFullScreen'] ||
                  document['msExitFullscreen'] ||
                  document['webkitCancelFullScreen'] ||
            (() => {});
        CFS.apply(document, []);
        return true;
      },
  nextRAF:0,
  fakeRequestAnimationFrame(func) {
        // try to keep 60fps between calls to here
        var now = Date.now();
        if (Browser.nextRAF === 0) {
          Browser.nextRAF = now + 1000/60;
        } else {
          while (now + 2 >= Browser.nextRAF) { // fudge a little, to avoid timer jitter causing us to do lots of delay:0
            Browser.nextRAF += 1000/60;
          }
        }
        var delay = Math.max(Browser.nextRAF - now, 0);
        setTimeout(func, delay);
      },
  requestAnimationFrame(func) {
        if (typeof requestAnimationFrame == 'function') {
          requestAnimationFrame(func);
          return;
        }
        var RAF = Browser.fakeRequestAnimationFrame;
        RAF(func);
      },
  safeSetTimeout(func, timeout) {
        // Legacy function, this is used by the SDL2 port so we need to keep it
        // around at least until that is updated.
        // See https://github.com/libsdl-org/SDL/pull/6304
        return safeSetTimeout(func, timeout);
      },
  safeRequestAnimationFrame(func) {
        
        return Browser.requestAnimationFrame(() => {
          
          callUserCallback(func);
        });
      },
  getMimetype(name) {
        return {
          'jpg': 'image/jpeg',
          'jpeg': 'image/jpeg',
          'png': 'image/png',
          'bmp': 'image/bmp',
          'ogg': 'audio/ogg',
          'wav': 'audio/wav',
          'mp3': 'audio/mpeg'
        }[name.substr(name.lastIndexOf('.')+1)];
      },
  getUserMedia(func) {
        window.getUserMedia ||= navigator['getUserMedia'] ||
                                navigator['mozGetUserMedia'];
        window.getUserMedia(func);
      },
  getMovementX(event) {
        return event['movementX'] ||
               event['mozMovementX'] ||
               event['webkitMovementX'] ||
               0;
      },
  getMovementY(event) {
        return event['movementY'] ||
               event['mozMovementY'] ||
               event['webkitMovementY'] ||
               0;
      },
  getMouseWheelDelta(event) {
        var delta = 0;
        switch (event.type) {
          case 'DOMMouseScroll':
            // 3 lines make up a step
            delta = event.detail / 3;
            break;
          case 'mousewheel':
            // 120 units make up a step
            delta = event.wheelDelta / 120;
            break;
          case 'wheel':
            delta = event.deltaY
            switch (event.deltaMode) {
              case 0:
                // DOM_DELTA_PIXEL: 100 pixels make up a step
                delta /= 100;
                break;
              case 1:
                // DOM_DELTA_LINE: 3 lines make up a step
                delta /= 3;
                break;
              case 2:
                // DOM_DELTA_PAGE: A page makes up 80 steps
                delta *= 80;
                break;
              default:
                throw 'unrecognized mouse wheel delta mode: ' + event.deltaMode;
            }
            break;
          default:
            throw 'unrecognized mouse wheel event: ' + event.type;
        }
        return delta;
      },
  mouseX:0,
  mouseY:0,
  mouseMovementX:0,
  mouseMovementY:0,
  touches:{
  },
  lastTouches:{
  },
  calculateMouseCoords(pageX, pageY) {
        // Calculate the movement based on the changes
        // in the coordinates.
        var rect = Module["canvas"].getBoundingClientRect();
        var cw = Module["canvas"].width;
        var ch = Module["canvas"].height;
  
        // Neither .scrollX or .pageXOffset are defined in a spec, but
        // we prefer .scrollX because it is currently in a spec draft.
        // (see: http://www.w3.org/TR/2013/WD-cssom-view-20131217/)
        var scrollX = ((typeof window.scrollX != 'undefined') ? window.scrollX : window.pageXOffset);
        var scrollY = ((typeof window.scrollY != 'undefined') ? window.scrollY : window.pageYOffset);
        // If this assert lands, it's likely because the browser doesn't support scrollX or pageXOffset
        // and we have no viable fallback.
        assert((typeof scrollX != 'undefined') && (typeof scrollY != 'undefined'), 'Unable to retrieve scroll position, mouse positions likely broken.');
        var adjustedX = pageX - (scrollX + rect.left);
        var adjustedY = pageY - (scrollY + rect.top);
  
        // the canvas might be CSS-scaled compared to its backbuffer;
        // SDL-using content will want mouse coordinates in terms
        // of backbuffer units.
        adjustedX = adjustedX * (cw / rect.width);
        adjustedY = adjustedY * (ch / rect.height);
  
        return { x: adjustedX, y: adjustedY };
      },
  setMouseCoords(pageX, pageY) {
        const {x, y} = Browser.calculateMouseCoords(pageX, pageY);
        Browser.mouseMovementX = x - Browser.mouseX;
        Browser.mouseMovementY = y - Browser.mouseY;
        Browser.mouseX = x;
        Browser.mouseY = y;
      },
  calculateMouseEvent(event) { // event should be mousemove, mousedown or mouseup
        if (Browser.pointerLock) {
          // When the pointer is locked, calculate the coordinates
          // based on the movement of the mouse.
          // Workaround for Firefox bug 764498
          if (event.type != 'mousemove' &&
              ('mozMovementX' in event)) {
            Browser.mouseMovementX = Browser.mouseMovementY = 0;
          } else {
            Browser.mouseMovementX = Browser.getMovementX(event);
            Browser.mouseMovementY = Browser.getMovementY(event);
          }
  
          // check if SDL is available
          if (typeof SDL != "undefined") {
            Browser.mouseX = SDL.mouseX + Browser.mouseMovementX;
            Browser.mouseY = SDL.mouseY + Browser.mouseMovementY;
          } else {
            // just add the mouse delta to the current absolut mouse position
            // FIXME: ideally this should be clamped against the canvas size and zero
            Browser.mouseX += Browser.mouseMovementX;
            Browser.mouseY += Browser.mouseMovementY;
          }
        } else {
          if (event.type === 'touchstart' || event.type === 'touchend' || event.type === 'touchmove') {
            var touch = event.touch;
            if (touch === undefined) {
              return; // the "touch" property is only defined in SDL
  
            }
            var coords = Browser.calculateMouseCoords(touch.pageX, touch.pageY);
  
            if (event.type === 'touchstart') {
              Browser.lastTouches[touch.identifier] = coords;
              Browser.touches[touch.identifier] = coords;
            } else if (event.type === 'touchend' || event.type === 'touchmove') {
              var last = Browser.touches[touch.identifier];
              last ||= coords;
              Browser.lastTouches[touch.identifier] = last;
              Browser.touches[touch.identifier] = coords;
            }
            return;
          }
  
          Browser.setMouseCoords(event.pageX, event.pageY);
        }
      },
  resizeListeners:[],
  updateResizeListeners() {
        var canvas = Module['canvas'];
        Browser.resizeListeners.forEach((listener) => listener(canvas.width, canvas.height));
      },
  setCanvasSize(width, height, noUpdates) {
        var canvas = Module['canvas'];
        Browser.updateCanvasDimensions(canvas, width, height);
        if (!noUpdates) Browser.updateResizeListeners();
      },
  windowedWidth:0,
  windowedHeight:0,
  setFullscreenCanvasSize() {
        // check if SDL is available
        if (typeof SDL != "undefined") {
          var flags = HEAPU32[((SDL.screen)>>2)];
          flags = flags | 0x00800000; // set SDL_FULLSCREEN flag
          HEAP32[((SDL.screen)>>2)] = flags;
        }
        Browser.updateCanvasDimensions(Module['canvas']);
        Browser.updateResizeListeners();
      },
  setWindowedCanvasSize() {
        // check if SDL is available
        if (typeof SDL != "undefined") {
          var flags = HEAPU32[((SDL.screen)>>2)];
          flags = flags & ~0x00800000; // clear SDL_FULLSCREEN flag
          HEAP32[((SDL.screen)>>2)] = flags;
        }
        Browser.updateCanvasDimensions(Module['canvas']);
        Browser.updateResizeListeners();
      },
  updateCanvasDimensions(canvas, wNative, hNative) {
        if (wNative && hNative) {
          canvas.widthNative = wNative;
          canvas.heightNative = hNative;
        } else {
          wNative = canvas.widthNative;
          hNative = canvas.heightNative;
        }
        var w = wNative;
        var h = hNative;
        if (Module['forcedAspectRatio'] && Module['forcedAspectRatio'] > 0) {
          if (w/h < Module['forcedAspectRatio']) {
            w = Math.round(h * Module['forcedAspectRatio']);
          } else {
            h = Math.round(w / Module['forcedAspectRatio']);
          }
        }
        if (((document['fullscreenElement'] || document['mozFullScreenElement'] ||
             document['msFullscreenElement'] || document['webkitFullscreenElement'] ||
             document['webkitCurrentFullScreenElement']) === canvas.parentNode) && (typeof screen != 'undefined')) {
           var factor = Math.min(screen.width / w, screen.height / h);
           w = Math.round(w * factor);
           h = Math.round(h * factor);
        }
        if (Browser.resizeCanvas) {
          if (canvas.width  != w) canvas.width  = w;
          if (canvas.height != h) canvas.height = h;
          if (typeof canvas.style != 'undefined') {
            canvas.style.removeProperty( "width");
            canvas.style.removeProperty("height");
          }
        } else {
          if (canvas.width  != wNative) canvas.width  = wNative;
          if (canvas.height != hNative) canvas.height = hNative;
          if (typeof canvas.style != 'undefined') {
            if (w != wNative || h != hNative) {
              canvas.style.setProperty( "width", w + "px", "important");
              canvas.style.setProperty("height", h + "px", "important");
            } else {
              canvas.style.removeProperty( "width");
              canvas.style.removeProperty("height");
            }
          }
        }
      },
  };
  
  var AL = {
  QUEUE_INTERVAL:25,
  QUEUE_LOOKAHEAD:0.1,
  DEVICE_NAME:"Emscripten OpenAL",
  CAPTURE_DEVICE_NAME:"Emscripten OpenAL capture",
  ALC_EXTENSIONS:{
  ALC_SOFT_pause_device:true,
  ALC_SOFT_HRTF:true,
  },
  AL_EXTENSIONS:{
  AL_EXT_float32:true,
  AL_SOFT_loop_points:true,
  AL_SOFT_source_length:true,
  AL_EXT_source_distance_model:true,
  AL_SOFT_source_spatialize:true,
  },
  _alcErr:0,
  alcErr:0,
  deviceRefCounts:{
  },
  alcStringCache:{
  },
  paused:false,
  stringCache:{
  },
  contexts:{
  },
  currentCtx:null,
  buffers:{
  0:{
  id:0,
  refCount:0,
  audioBuf:null,
  frequency:0,
  bytesPerSample:2,
  channels:1,
  length:0,
  },
  },
  paramArray:[],
  _nextId:1,
  newId:() => AL.freeIds.length > 0 ? AL.freeIds.pop() : AL._nextId++,
  freeIds:[],
  scheduleContextAudio:(ctx) => {
        // If we are animating using the requestAnimationFrame method, then the main loop does not run when in the background.
        // To give a perfect glitch-free audio stop when switching from foreground to background, we need to avoid updating
        // audio altogether when in the background, so detect that case and kill audio buffer streaming if so.
        if (Browser.mainLoop.timingMode === 1 && document['visibilityState'] != 'visible') {
          return;
        }
  
        for (var i in ctx.sources) {
          AL.scheduleSourceAudio(ctx.sources[i]);
        }
      },
  scheduleSourceAudio:(src, lookahead) => {
        // See comment on scheduleContextAudio above.
        if (Browser.mainLoop.timingMode === 1 && document['visibilityState'] != 'visible') {
          return;
        }
        if (src.state !== 4114) {
          return;
        }
  
        var currentTime = AL.updateSourceTime(src);
  
        var startTime = src.bufStartTime;
        var startOffset = src.bufOffset;
        var bufCursor = src.bufsProcessed;
  
        // Advance past any audio that is already scheduled
        for (var i = 0; i < src.audioQueue.length; i++) {
          var audioSrc = src.audioQueue[i];
          startTime = audioSrc._startTime + audioSrc._duration;
          startOffset = 0.0;
          bufCursor += audioSrc._skipCount + 1;
        }
  
        if (!lookahead) {
          lookahead = AL.QUEUE_LOOKAHEAD;
        }
        var lookaheadTime = currentTime + lookahead;
        var skipCount = 0;
        while (startTime < lookaheadTime) {
          if (bufCursor >= src.bufQueue.length) {
            if (src.looping) {
              bufCursor %= src.bufQueue.length;
            } else {
              break;
            }
          }
  
          var buf = src.bufQueue[bufCursor % src.bufQueue.length];
          // If the buffer contains no data, skip it
          if (buf.length === 0) {
            skipCount++;
            // If we've gone through the whole queue and everything is 0 length, just give up
            if (skipCount === src.bufQueue.length) {
              break;
            }
          } else {
            var audioSrc = src.context.audioCtx.createBufferSource();
            audioSrc.buffer = buf.audioBuf;
            audioSrc.playbackRate.value = src.playbackRate;
            if (buf.audioBuf._loopStart || buf.audioBuf._loopEnd) {
              audioSrc.loopStart = buf.audioBuf._loopStart;
              audioSrc.loopEnd = buf.audioBuf._loopEnd;
            }
  
            var duration = 0.0;
            // If the source is a looping static buffer, use native looping for gapless playback
            if (src.type === 4136 && src.looping) {
              duration = Number.POSITIVE_INFINITY;
              audioSrc.loop = true;
              if (buf.audioBuf._loopStart) {
                audioSrc.loopStart = buf.audioBuf._loopStart;
              }
              if (buf.audioBuf._loopEnd) {
                audioSrc.loopEnd = buf.audioBuf._loopEnd;
              }
            } else {
              duration = (buf.audioBuf.duration - startOffset) / src.playbackRate;
            }
  
            audioSrc._startOffset = startOffset;
            audioSrc._duration = duration;
            audioSrc._skipCount = skipCount;
            skipCount = 0;
  
            audioSrc.connect(src.gain);
  
            if (typeof audioSrc.start != 'undefined') {
              // Sample the current time as late as possible to mitigate drift
              startTime = Math.max(startTime, src.context.audioCtx.currentTime);
              audioSrc.start(startTime, startOffset);
            } else if (typeof audioSrc.noteOn != 'undefined') {
              startTime = Math.max(startTime, src.context.audioCtx.currentTime);
              audioSrc.noteOn(startTime);
            }
            audioSrc._startTime = startTime;
            src.audioQueue.push(audioSrc);
  
            startTime += duration;
          }
  
          startOffset = 0.0;
          bufCursor++;
        }
      },
  updateSourceTime:(src) => {
        var currentTime = src.context.audioCtx.currentTime;
        if (src.state !== 4114) {
          return currentTime;
        }
  
        // if the start time is unset, determine it based on the current offset.
        // This will be the case when a source is resumed after being paused, and
        // allows us to pretend that the source actually started playing some time
        // in the past such that it would just now have reached the stored offset.
        if (!isFinite(src.bufStartTime)) {
          src.bufStartTime = currentTime - src.bufOffset / src.playbackRate;
          src.bufOffset = 0.0;
        }
  
        var nextStartTime = 0.0;
        while (src.audioQueue.length) {
          var audioSrc = src.audioQueue[0];
          src.bufsProcessed += audioSrc._skipCount;
          nextStartTime = audioSrc._startTime + audioSrc._duration; // n.b. audioSrc._duration already factors in playbackRate, so no divide by src.playbackRate on it.
  
          if (currentTime < nextStartTime) {
            break;
          }
  
          src.audioQueue.shift();
          src.bufStartTime = nextStartTime;
          src.bufOffset = 0.0;
          src.bufsProcessed++;
        }
  
        if (src.bufsProcessed >= src.bufQueue.length && !src.looping) {
          // The source has played its entire queue and is non-looping, so just mark it as stopped.
          AL.setSourceState(src, 4116);
        } else if (src.type === 4136 && src.looping) {
          // If the source is a looping static buffer, determine the buffer offset based on the loop points
          var buf = src.bufQueue[0];
          if (buf.length === 0) {
            src.bufOffset = 0.0;
          } else {
            var delta = (currentTime - src.bufStartTime) * src.playbackRate;
            var loopStart = buf.audioBuf._loopStart || 0.0;
            var loopEnd = buf.audioBuf._loopEnd || buf.audioBuf.duration;
            if (loopEnd <= loopStart) {
              loopEnd = buf.audioBuf.duration;
            }
  
            if (delta < loopEnd) {
              src.bufOffset = delta;
            } else {
              src.bufOffset = loopStart + (delta - loopStart) % (loopEnd - loopStart);
            }
          }
        } else if (src.audioQueue[0]) {
          // The source is still actively playing, so we just need to calculate where we are in the current buffer
          // so it can be remembered if the source gets paused.
          src.bufOffset = (currentTime - src.audioQueue[0]._startTime) * src.playbackRate;
        } else {
          // The source hasn't finished yet, but there is no scheduled audio left for it. This can be because
          // the source has just been started/resumed, or due to an underrun caused by a long blocking operation.
          // We need to determine what state we would be in by this point in time so that when we next schedule
          // audio playback, it will be just as if no underrun occurred.
  
          if (src.type !== 4136 && src.looping) {
            // if the source is a looping buffer queue, let's first calculate the queue duration, so we can
            // quickly fast forward past any full loops of the queue and only worry about the remainder.
            var srcDuration = AL.sourceDuration(src) / src.playbackRate;
            if (srcDuration > 0.0) {
              src.bufStartTime += Math.floor((currentTime - src.bufStartTime) / srcDuration) * srcDuration;
            }
          }
  
          // Since we've already skipped any full-queue loops if there were any, we just need to find
          // out where in the queue the remaining time puts us, which won't require stepping through the
          // entire queue more than once.
          for (var i = 0; i < src.bufQueue.length; i++) {
            if (src.bufsProcessed >= src.bufQueue.length) {
              if (src.looping) {
                src.bufsProcessed %= src.bufQueue.length;
              } else {
                AL.setSourceState(src, 4116);
                break;
              }
            }
  
            var buf = src.bufQueue[src.bufsProcessed];
            if (buf.length > 0) {
              nextStartTime = src.bufStartTime + buf.audioBuf.duration / src.playbackRate;
  
              if (currentTime < nextStartTime) {
                src.bufOffset = (currentTime - src.bufStartTime) * src.playbackRate;
                break;
              }
  
              src.bufStartTime = nextStartTime;
            }
  
            src.bufOffset = 0.0;
            src.bufsProcessed++;
          }
        }
  
        return currentTime;
      },
  cancelPendingSourceAudio:(src) => {
        AL.updateSourceTime(src);
  
        for (var i = 1; i < src.audioQueue.length; i++) {
          var audioSrc = src.audioQueue[i];
          audioSrc.stop();
        }
  
        if (src.audioQueue.length > 1) {
          src.audioQueue.length = 1;
        }
      },
  stopSourceAudio:(src) => {
        for (var i = 0; i < src.audioQueue.length; i++) {
          src.audioQueue[i].stop();
        }
        src.audioQueue.length = 0;
      },
  setSourceState:(src, state) => {
        if (state === 4114) {
          if (src.state === 4114 || src.state == 4116) {
            src.bufsProcessed = 0;
            src.bufOffset = 0.0;
          } else {
          }
  
          AL.stopSourceAudio(src);
  
          src.state = 4114;
          src.bufStartTime = Number.NEGATIVE_INFINITY;
          AL.scheduleSourceAudio(src);
        } else if (state === 4115) {
          if (src.state === 4114) {
            // Store off the current offset to restore with on resume.
            AL.updateSourceTime(src);
            AL.stopSourceAudio(src);
  
            src.state = 4115;
          }
        } else if (state === 4116) {
          if (src.state !== 4113) {
            src.state = 4116;
            src.bufsProcessed = src.bufQueue.length;
            src.bufStartTime = Number.NEGATIVE_INFINITY;
            src.bufOffset = 0.0;
            AL.stopSourceAudio(src);
          }
        } else if (state === 4113) {
          if (src.state !== 4113) {
            src.state = 4113;
            src.bufsProcessed = 0;
            src.bufStartTime = Number.NEGATIVE_INFINITY;
            src.bufOffset = 0.0;
            AL.stopSourceAudio(src);
          }
        }
      },
  initSourcePanner:(src) => {
        if (src.type === 0x1030 /* AL_UNDETERMINED */) {
          return;
        }
  
        // Find the first non-zero buffer in the queue to determine the proper format
        var templateBuf = AL.buffers[0];
        for (var i = 0; i < src.bufQueue.length; i++) {
          if (src.bufQueue[i].id !== 0) {
            templateBuf = src.bufQueue[i];
            break;
          }
        }
        // Create a panner if AL_SOURCE_SPATIALIZE_SOFT is set to true, or alternatively if it's set to auto and the source is mono
        if (src.spatialize === 1 || (src.spatialize === 2 /* AL_AUTO_SOFT */ && templateBuf.channels === 1)) {
          if (src.panner) {
            return;
          }
          src.panner = src.context.audioCtx.createPanner();
  
          AL.updateSourceGlobal(src);
          AL.updateSourceSpace(src);
  
          src.panner.connect(src.context.gain);
          src.gain.disconnect();
          src.gain.connect(src.panner);
        } else {
          if (!src.panner) {
            return;
          }
  
          src.panner.disconnect();
          src.gain.disconnect();
          src.gain.connect(src.context.gain);
          src.panner = null;
        }
      },
  updateContextGlobal:(ctx) => {
        for (var i in ctx.sources) {
          AL.updateSourceGlobal(ctx.sources[i]);
        }
      },
  updateSourceGlobal:(src) => {
        var panner = src.panner;
        if (!panner) {
          return;
        }
  
        panner.refDistance = src.refDistance;
        panner.maxDistance = src.maxDistance;
        panner.rolloffFactor = src.rolloffFactor;
  
        panner.panningModel = src.context.hrtf ? 'HRTF' : 'equalpower';
  
        // Use the source's distance model if AL_SOURCE_DISTANCE_MODEL is enabled
        var distanceModel = src.context.sourceDistanceModel ? src.distanceModel : src.context.distanceModel;
        switch (distanceModel) {
        case 0:
          panner.distanceModel = 'inverse';
          panner.refDistance = 3.40282e38 /* FLT_MAX */;
          break;
        case 0xd001 /* AL_INVERSE_DISTANCE */:
        case 0xd002 /* AL_INVERSE_DISTANCE_CLAMPED */:
          panner.distanceModel = 'inverse';
          break;
        case 0xd003 /* AL_LINEAR_DISTANCE */:
        case 0xd004 /* AL_LINEAR_DISTANCE_CLAMPED */:
          panner.distanceModel = 'linear';
          break;
        case 0xd005 /* AL_EXPONENT_DISTANCE */:
        case 0xd006 /* AL_EXPONENT_DISTANCE_CLAMPED */:
          panner.distanceModel = 'exponential';
          break;
        }
      },
  updateListenerSpace:(ctx) => {
        var listener = ctx.audioCtx.listener;
        if (listener.positionX) {
          listener.positionX.value = ctx.listener.position[0];
          listener.positionY.value = ctx.listener.position[1];
          listener.positionZ.value = ctx.listener.position[2];
        } else {
          listener.setPosition(ctx.listener.position[0], ctx.listener.position[1], ctx.listener.position[2]);
        }
        if (listener.forwardX) {
          listener.forwardX.value = ctx.listener.direction[0];
          listener.forwardY.value = ctx.listener.direction[1];
          listener.forwardZ.value = ctx.listener.direction[2];
          listener.upX.value = ctx.listener.up[0];
          listener.upY.value = ctx.listener.up[1];
          listener.upZ.value = ctx.listener.up[2];
        } else {
          listener.setOrientation(
            ctx.listener.direction[0], ctx.listener.direction[1], ctx.listener.direction[2],
            ctx.listener.up[0], ctx.listener.up[1], ctx.listener.up[2]);
        }
  
        // Update sources that are relative to the listener
        for (var i in ctx.sources) {
          AL.updateSourceSpace(ctx.sources[i]);
        }
      },
  updateSourceSpace:(src) => {
        if (!src.panner) {
          return;
        }
        var panner = src.panner;
  
        var posX = src.position[0];
        var posY = src.position[1];
        var posZ = src.position[2];
        var dirX = src.direction[0];
        var dirY = src.direction[1];
        var dirZ = src.direction[2];
  
        var listener = src.context.listener;
        var lPosX = listener.position[0];
        var lPosY = listener.position[1];
        var lPosZ = listener.position[2];
  
        // WebAudio does spatialization in world-space coordinates, meaning both the buffer sources and
        // the listener position are in the same absolute coordinate system relative to a fixed origin.
        // By default, OpenAL works this way as well, but it also provides a "listener relative" mode, where
        // a buffer source's coordinate are interpreted not in absolute world space, but as being relative
        // to the listener object itself, so as the listener moves the source appears to move with it
        // with no update required. Since web audio does not support this mode, we must transform the source
        // coordinates from listener-relative space to absolute world space.
        //
        // We do this via affine transformation matrices applied to the source position and source direction.
        // A change-of-basis converts from listener-space displacements to world-space displacements,
        // which must be done for both the source position and direction. Lastly, the source position must be
        // added to the listener position to get the final source position, since the source position represents
        // a displacement from the listener.
        if (src.relative) {
          // Negate the listener direction since forward is -Z.
          var lBackX = -listener.direction[0];
          var lBackY = -listener.direction[1];
          var lBackZ = -listener.direction[2];
          var lUpX = listener.up[0];
          var lUpY = listener.up[1];
          var lUpZ = listener.up[2];
  
          var inverseMagnitude = (x, y, z) => {
            var length = Math.sqrt(x * x + y * y + z * z);
  
            if (length < Number.EPSILON) {
              return 0.0;
            }
  
            return 1.0 / length;
          };
  
          // Normalize the Back vector
          var invMag = inverseMagnitude(lBackX, lBackY, lBackZ);
          lBackX *= invMag;
          lBackY *= invMag;
          lBackZ *= invMag;
  
          // ...and the Up vector
          invMag = inverseMagnitude(lUpX, lUpY, lUpZ);
          lUpX *= invMag;
          lUpY *= invMag;
          lUpZ *= invMag;
  
          // Calculate the Right vector as the cross product of the Up and Back vectors
          var lRightX = (lUpY * lBackZ - lUpZ * lBackY);
          var lRightY = (lUpZ * lBackX - lUpX * lBackZ);
          var lRightZ = (lUpX * lBackY - lUpY * lBackX);
  
          // Back and Up might not be exactly perpendicular, so the cross product also needs normalization
          invMag = inverseMagnitude(lRightX, lRightY, lRightZ);
          lRightX *= invMag;
          lRightY *= invMag;
          lRightZ *= invMag;
  
          // Recompute Up from the now orthonormal Right and Back vectors so we have a fully orthonormal basis
          lUpX = (lBackY * lRightZ - lBackZ * lRightY);
          lUpY = (lBackZ * lRightX - lBackX * lRightZ);
          lUpZ = (lBackX * lRightY - lBackY * lRightX);
  
          var oldX = dirX;
          var oldY = dirY;
          var oldZ = dirZ;
  
          // Use our 3 vectors to apply a change-of-basis matrix to the source direction
          dirX = oldX * lRightX + oldY * lUpX + oldZ * lBackX;
          dirY = oldX * lRightY + oldY * lUpY + oldZ * lBackY;
          dirZ = oldX * lRightZ + oldY * lUpZ + oldZ * lBackZ;
  
          oldX = posX;
          oldY = posY;
          oldZ = posZ;
  
          // ...and to the source position
          posX = oldX * lRightX + oldY * lUpX + oldZ * lBackX;
          posY = oldX * lRightY + oldY * lUpY + oldZ * lBackY;
          posZ = oldX * lRightZ + oldY * lUpZ + oldZ * lBackZ;
  
          // The change-of-basis corrects the orientation, but the origin is still the listener.
          // Translate the source position by the listener position to finish.
          posX += lPosX;
          posY += lPosY;
          posZ += lPosZ;
        }
  
        if (panner.positionX) {
          // Assigning to panner.positionX/Y/Z unnecessarily seems to cause performance issues
          // See https://github.com/emscripten-core/emscripten/issues/15847
  
          if (posX != panner.positionX.value) panner.positionX.value = posX;
          if (posY != panner.positionY.value) panner.positionY.value = posY;
          if (posZ != panner.positionZ.value) panner.positionZ.value = posZ;
        } else {
          panner.setPosition(posX, posY, posZ);
        }
        if (panner.orientationX) {
          // Assigning to panner.orientation/Y/Z unnecessarily seems to cause performance issues
          // See https://github.com/emscripten-core/emscripten/issues/15847
  
          if (dirX != panner.orientationX.value) panner.orientationX.value = dirX;
          if (dirY != panner.orientationY.value) panner.orientationY.value = dirY;
          if (dirZ != panner.orientationZ.value) panner.orientationZ.value = dirZ;
        } else {
          panner.setOrientation(dirX, dirY, dirZ);
        }
  
        var oldShift = src.dopplerShift;
        var velX = src.velocity[0];
        var velY = src.velocity[1];
        var velZ = src.velocity[2];
        var lVelX = listener.velocity[0];
        var lVelY = listener.velocity[1];
        var lVelZ = listener.velocity[2];
        if (posX === lPosX && posY === lPosY && posZ === lPosZ
          || velX === lVelX && velY === lVelY && velZ === lVelZ)
        {
          src.dopplerShift = 1.0;
        } else {
          // Doppler algorithm from 1.1 spec
          var speedOfSound = src.context.speedOfSound;
          var dopplerFactor = src.context.dopplerFactor;
  
          var slX = lPosX - posX;
          var slY = lPosY - posY;
          var slZ = lPosZ - posZ;
  
          var magSl = Math.sqrt(slX * slX + slY * slY + slZ * slZ);
          var vls = (slX * lVelX + slY * lVelY + slZ * lVelZ) / magSl;
          var vss = (slX * velX + slY * velY + slZ * velZ) / magSl;
  
          vls = Math.min(vls, speedOfSound / dopplerFactor);
          vss = Math.min(vss, speedOfSound / dopplerFactor);
  
          src.dopplerShift = (speedOfSound - dopplerFactor * vls) / (speedOfSound - dopplerFactor * vss);
        }
        if (src.dopplerShift !== oldShift) {
          AL.updateSourceRate(src);
        }
      },
  updateSourceRate:(src) => {
        if (src.state === 4114) {
          // clear scheduled buffers
          AL.cancelPendingSourceAudio(src);
  
          var audioSrc = src.audioQueue[0];
          if (!audioSrc) {
            return; // It is possible that AL.scheduleContextAudio() has not yet fed the next buffer, if so, skip.
          }
  
          var duration;
          if (src.type === 4136 && src.looping) {
            duration = Number.POSITIVE_INFINITY;
          } else {
            // audioSrc._duration is expressed after factoring in playbackRate, so when changing playback rate, need
            // to recompute/rescale the rate to the new playback speed.
            duration = (audioSrc.buffer.duration - audioSrc._startOffset) / src.playbackRate;
          }
  
          audioSrc._duration = duration;
          audioSrc.playbackRate.value = src.playbackRate;
  
          // reschedule buffers with the new playbackRate
          AL.scheduleSourceAudio(src);
        }
      },
  sourceDuration:(src) => {
        var length = 0.0;
        for (var i = 0; i < src.bufQueue.length; i++) {
          var audioBuf = src.bufQueue[i].audioBuf;
          length += audioBuf ? audioBuf.duration : 0.0;
        }
        return length;
      },
  sourceTell:(src) => {
        AL.updateSourceTime(src);
  
        var offset = 0.0;
        for (var i = 0; i < src.bufsProcessed; i++) {
          if (src.bufQueue[i].audioBuf) {
            offset += src.bufQueue[i].audioBuf.duration;
          }
        }
        offset += src.bufOffset;
  
        return offset;
      },
  sourceSeek:(src, offset) => {
        var playing = src.state == 4114;
        if (playing) {
          AL.setSourceState(src, 4113);
        }
  
        if (src.bufQueue[src.bufsProcessed].audioBuf !== null) {
          src.bufsProcessed = 0;
          while (offset > src.bufQueue[src.bufsProcessed].audioBuf.duration) {
            offset -= src.bufQueue[src.bufsProcessed].audiobuf.duration;
            src.bufsProcessed++;
          }
  
          src.bufOffset = offset;
        }
  
        if (playing) {
          AL.setSourceState(src, 4114);
        }
      },
  getGlobalParam:(funcname, param) => {
        if (!AL.currentCtx) {
          return null;
        }
  
        switch (param) {
        case 49152:
          return AL.currentCtx.dopplerFactor;
        case 49155:
          return AL.currentCtx.speedOfSound;
        case 53248:
          return AL.currentCtx.distanceModel;
        default:
          AL.currentCtx.err = 40962;
          return null;
        }
      },
  setGlobalParam:(funcname, param, value) => {
        if (!AL.currentCtx) {
          return;
        }
  
        switch (param) {
        case 49152:
          if (!Number.isFinite(value) || value < 0.0) { // Strictly negative values are disallowed
            AL.currentCtx.err = 40963;
            return;
          }
  
          AL.currentCtx.dopplerFactor = value;
          AL.updateListenerSpace(AL.currentCtx);
          break;
        case 49155:
          if (!Number.isFinite(value) || value <= 0.0) { // Negative or zero values are disallowed
            AL.currentCtx.err = 40963;
            return;
          }
  
          AL.currentCtx.speedOfSound = value;
          AL.updateListenerSpace(AL.currentCtx);
          break;
        case 53248:
          switch (value) {
          case 0:
          case 0xd001 /* AL_INVERSE_DISTANCE */:
          case 0xd002 /* AL_INVERSE_DISTANCE_CLAMPED */:
          case 0xd003 /* AL_LINEAR_DISTANCE */:
          case 0xd004 /* AL_LINEAR_DISTANCE_CLAMPED */:
          case 0xd005 /* AL_EXPONENT_DISTANCE */:
          case 0xd006 /* AL_EXPONENT_DISTANCE_CLAMPED */:
            AL.currentCtx.distanceModel = value;
            AL.updateContextGlobal(AL.currentCtx);
            break;
          default:
            AL.currentCtx.err = 40963;
            return;
          }
          break;
        default:
          AL.currentCtx.err = 40962;
          return;
        }
      },
  getListenerParam:(funcname, param) => {
        if (!AL.currentCtx) {
          return null;
        }
  
        switch (param) {
        case 4100:
          return AL.currentCtx.listener.position;
        case 4102:
          return AL.currentCtx.listener.velocity;
        case 4111:
          return AL.currentCtx.listener.direction.concat(AL.currentCtx.listener.up);
        case 4106:
          return AL.currentCtx.gain.gain.value;
        default:
          AL.currentCtx.err = 40962;
          return null;
        }
      },
  setListenerParam:(funcname, param, value) => {
        if (!AL.currentCtx) {
          return;
        }
        if (value === null) {
          AL.currentCtx.err = 40962;
          return;
        }
  
        var listener = AL.currentCtx.listener;
        switch (param) {
        case 4100:
          if (!Number.isFinite(value[0]) || !Number.isFinite(value[1]) || !Number.isFinite(value[2])) {
            AL.currentCtx.err = 40963;
            return;
          }
  
          listener.position[0] = value[0];
          listener.position[1] = value[1];
          listener.position[2] = value[2];
          AL.updateListenerSpace(AL.currentCtx);
          break;
        case 4102:
          if (!Number.isFinite(value[0]) || !Number.isFinite(value[1]) || !Number.isFinite(value[2])) {
            AL.currentCtx.err = 40963;
            return;
          }
  
          listener.velocity[0] = value[0];
          listener.velocity[1] = value[1];
          listener.velocity[2] = value[2];
          AL.updateListenerSpace(AL.currentCtx);
          break;
        case 4106:
          if (!Number.isFinite(value) || value < 0.0) {
            AL.currentCtx.err = 40963;
            return;
          }
  
          AL.currentCtx.gain.gain.value = value;
          break;
        case 4111:
          if (!Number.isFinite(value[0]) || !Number.isFinite(value[1]) || !Number.isFinite(value[2])
            || !Number.isFinite(value[3]) || !Number.isFinite(value[4]) || !Number.isFinite(value[5])
          ) {
            AL.currentCtx.err = 40963;
            return;
          }
  
          listener.direction[0] = value[0];
          listener.direction[1] = value[1];
          listener.direction[2] = value[2];
          listener.up[0] = value[3];
          listener.up[1] = value[4];
          listener.up[2] = value[5];
          AL.updateListenerSpace(AL.currentCtx);
          break;
        default:
          AL.currentCtx.err = 40962;
          return;
        }
      },
  getBufferParam:(funcname, bufferId, param) => {
        if (!AL.currentCtx) {
          return;
        }
        var buf = AL.buffers[bufferId];
        if (!buf || bufferId === 0) {
          AL.currentCtx.err = 40961;
          return;
        }
  
        switch (param) {
        case 0x2001 /* AL_FREQUENCY */:
          return buf.frequency;
        case 0x2002 /* AL_BITS */:
          return buf.bytesPerSample * 8;
        case 0x2003 /* AL_CHANNELS */:
          return buf.channels;
        case 0x2004 /* AL_SIZE */:
          return buf.length * buf.bytesPerSample * buf.channels;
        case 0x2015 /* AL_LOOP_POINTS_SOFT */:
          if (buf.length === 0) {
            return [0, 0];
          }
          return [
            (buf.audioBuf._loopStart || 0.0) * buf.frequency,
            (buf.audioBuf._loopEnd || buf.length) * buf.frequency
          ];
        default:
          AL.currentCtx.err = 40962;
          return null;
        }
      },
  setBufferParam:(funcname, bufferId, param, value) => {
        if (!AL.currentCtx) {
          return;
        }
        var buf = AL.buffers[bufferId];
        if (!buf || bufferId === 0) {
          AL.currentCtx.err = 40961;
          return;
        }
        if (value === null) {
          AL.currentCtx.err = 40962;
          return;
        }
  
        switch (param) {
        case 0x2004 /* AL_SIZE */:
          if (value !== 0) {
            AL.currentCtx.err = 40963;
            return;
          }
  
          // Per the spec, setting AL_SIZE to 0 is a legal NOP.
          break;
        case 0x2015 /* AL_LOOP_POINTS_SOFT */:
          if (value[0] < 0 || value[0] > buf.length || value[1] < 0 || value[1] > buf.Length || value[0] >= value[1]) {
            AL.currentCtx.err = 40963;
            return;
          }
          if (buf.refCount > 0) {
            AL.currentCtx.err = 40964;
            return;
          }
  
          if (buf.audioBuf) {
            buf.audioBuf._loopStart = value[0] / buf.frequency;
            buf.audioBuf._loopEnd = value[1] / buf.frequency;
          }
          break;
        default:
          AL.currentCtx.err = 40962;
          return;
        }
      },
  getSourceParam:(funcname, sourceId, param) => {
        if (!AL.currentCtx) {
          return null;
        }
        var src = AL.currentCtx.sources[sourceId];
        if (!src) {
          AL.currentCtx.err = 40961;
          return null;
        }
  
        switch (param) {
        case 0x202 /* AL_SOURCE_RELATIVE */:
          return src.relative;
        case 0x1001 /* AL_CONE_INNER_ANGLE */:
          return src.coneInnerAngle;
        case 0x1002 /* AL_CONE_OUTER_ANGLE */:
          return src.coneOuterAngle;
        case 0x1003 /* AL_PITCH */:
          return src.pitch;
        case 4100:
          return src.position;
        case 4101:
          return src.direction;
        case 4102:
          return src.velocity;
        case 0x1007 /* AL_LOOPING */:
          return src.looping;
        case 0x1009 /* AL_BUFFER */:
          if (src.type === 4136) {
            return src.bufQueue[0].id;
          }
          return 0;
        case 4106:
          return src.gain.gain.value;
         case 0x100D /* AL_MIN_GAIN */:
          return src.minGain;
        case 0x100E /* AL_MAX_GAIN */:
          return src.maxGain;
        case 0x1010 /* AL_SOURCE_STATE */:
          return src.state;
        case 0x1015 /* AL_BUFFERS_QUEUED */:
          if (src.bufQueue.length === 1 && src.bufQueue[0].id === 0) {
            return 0;
          }
          return src.bufQueue.length;
        case 0x1016 /* AL_BUFFERS_PROCESSED */:
          if ((src.bufQueue.length === 1 && src.bufQueue[0].id === 0) || src.looping) {
            return 0;
          }
          return src.bufsProcessed;
        case 0x1020 /* AL_REFERENCE_DISTANCE */:
          return src.refDistance;
        case 0x1021 /* AL_ROLLOFF_FACTOR */:
          return src.rolloffFactor;
        case 0x1022 /* AL_CONE_OUTER_GAIN */:
          return src.coneOuterGain;
        case 0x1023 /* AL_MAX_DISTANCE */:
          return src.maxDistance;
        case 0x1024 /* AL_SEC_OFFSET */:
          return AL.sourceTell(src);
        case 0x1025 /* AL_SAMPLE_OFFSET */:
          var offset = AL.sourceTell(src);
          if (offset > 0.0) {
            offset *= src.bufQueue[0].frequency;
          }
          return offset;
        case 0x1026 /* AL_BYTE_OFFSET */:
          var offset = AL.sourceTell(src);
          if (offset > 0.0) {
            offset *= src.bufQueue[0].frequency * src.bufQueue[0].bytesPerSample;
          }
          return offset;
        case 0x1027 /* AL_SOURCE_TYPE */:
          return src.type;
        case 0x1214 /* AL_SOURCE_SPATIALIZE_SOFT */:
          return src.spatialize;
        case 0x2009 /* AL_BYTE_LENGTH_SOFT */:
          var length = 0;
          var bytesPerFrame = 0;
          for (var i = 0; i < src.bufQueue.length; i++) {
            length += src.bufQueue[i].length;
            if (src.bufQueue[i].id !== 0) {
              bytesPerFrame = src.bufQueue[i].bytesPerSample * src.bufQueue[i].channels;
            }
          }
          return length * bytesPerFrame;
        case 0x200A /* AL_SAMPLE_LENGTH_SOFT */:
          var length = 0;
          for (var i = 0; i < src.bufQueue.length; i++) {
            length += src.bufQueue[i].length;
          }
          return length;
        case 0x200B /* AL_SEC_LENGTH_SOFT */:
          return AL.sourceDuration(src);
        case 53248:
          return src.distanceModel;
        default:
          AL.currentCtx.err = 40962;
          return null;
        }
      },
  setSourceParam:(funcname, sourceId, param, value) => {
        if (!AL.currentCtx) {
          return;
        }
        var src = AL.currentCtx.sources[sourceId];
        if (!src) {
          AL.currentCtx.err = 40961;
          return;
        }
        if (value === null) {
          AL.currentCtx.err = 40962;
          return;
        }
  
        switch (param) {
        case 0x202 /* AL_SOURCE_RELATIVE */:
          if (value === 1) {
            src.relative = true;
            AL.updateSourceSpace(src);
          } else if (value === 0) {
            src.relative = false;
            AL.updateSourceSpace(src);
          } else {
            AL.currentCtx.err = 40963;
            return;
          }
          break;
        case 0x1001 /* AL_CONE_INNER_ANGLE */:
          if (!Number.isFinite(value)) {
            AL.currentCtx.err = 40963;
            return;
          }
  
          src.coneInnerAngle = value;
          if (src.panner) {
            src.panner.coneInnerAngle = value % 360.0;
          }
          break;
        case 0x1002 /* AL_CONE_OUTER_ANGLE */:
          if (!Number.isFinite(value)) {
            AL.currentCtx.err = 40963;
            return;
          }
  
          src.coneOuterAngle = value;
          if (src.panner) {
            src.panner.coneOuterAngle = value % 360.0;
          }
          break;
        case 0x1003 /* AL_PITCH */:
          if (!Number.isFinite(value) || value <= 0.0) {
            AL.currentCtx.err = 40963;
            return;
          }
  
          if (src.pitch === value) {
            break;
          }
  
          src.pitch = value;
          AL.updateSourceRate(src);
          break;
        case 4100:
          if (!Number.isFinite(value[0]) || !Number.isFinite(value[1]) || !Number.isFinite(value[2])) {
            AL.currentCtx.err = 40963;
            return;
          }
  
          src.position[0] = value[0];
          src.position[1] = value[1];
          src.position[2] = value[2];
          AL.updateSourceSpace(src);
          break;
        case 4101:
          if (!Number.isFinite(value[0]) || !Number.isFinite(value[1]) || !Number.isFinite(value[2])) {
            AL.currentCtx.err = 40963;
            return;
          }
  
          src.direction[0] = value[0];
          src.direction[1] = value[1];
          src.direction[2] = value[2];
          AL.updateSourceSpace(src);
          break;
        case 4102:
          if (!Number.isFinite(value[0]) || !Number.isFinite(value[1]) || !Number.isFinite(value[2])) {
            AL.currentCtx.err = 40963;
            return;
          }
  
          src.velocity[0] = value[0];
          src.velocity[1] = value[1];
          src.velocity[2] = value[2];
          AL.updateSourceSpace(src);
          break;
        case 0x1007 /* AL_LOOPING */:
          if (value === 1) {
            src.looping = true;
            AL.updateSourceTime(src);
            if (src.type === 4136 && src.audioQueue.length > 0) {
              var audioSrc  = src.audioQueue[0];
              audioSrc.loop = true;
              audioSrc._duration = Number.POSITIVE_INFINITY;
            }
          } else if (value === 0) {
            src.looping = false;
            var currentTime = AL.updateSourceTime(src);
            if (src.type === 4136 && src.audioQueue.length > 0) {
              var audioSrc  = src.audioQueue[0];
              audioSrc.loop = false;
              audioSrc._duration = src.bufQueue[0].audioBuf.duration / src.playbackRate;
              audioSrc._startTime = currentTime - src.bufOffset / src.playbackRate;
            }
          } else {
            AL.currentCtx.err = 40963;
            return;
          }
          break;
        case 0x1009 /* AL_BUFFER */:
          if (src.state === 4114 || src.state === 4115) {
            AL.currentCtx.err = 40964;
            return;
          }
  
          if (value === 0) {
            for (var i in src.bufQueue) {
              src.bufQueue[i].refCount--;
            }
            src.bufQueue.length = 1;
            src.bufQueue[0] = AL.buffers[0];
  
            src.bufsProcessed = 0;
            src.type = 0x1030 /* AL_UNDETERMINED */;
          } else {
            var buf = AL.buffers[value];
            if (!buf) {
              AL.currentCtx.err = 40963;
              return;
            }
  
            for (var i in src.bufQueue) {
              src.bufQueue[i].refCount--;
            }
            src.bufQueue.length = 0;
  
            buf.refCount++;
            src.bufQueue = [buf];
            src.bufsProcessed = 0;
            src.type = 4136;
          }
  
          AL.initSourcePanner(src);
          AL.scheduleSourceAudio(src);
          break;
        case 4106:
          if (!Number.isFinite(value) || value < 0.0) {
            AL.currentCtx.err = 40963;
            return;
          }
          src.gain.gain.value = value;
          break;
        case 0x100D /* AL_MIN_GAIN */:
          if (!Number.isFinite(value) || value < 0.0 || value > Math.min(src.maxGain, 1.0)) {
            AL.currentCtx.err = 40963;
            return;
          }
          src.minGain = value;
          break;
        case 0x100E /* AL_MAX_GAIN */:
          if (!Number.isFinite(value) || value < Math.max(0.0, src.minGain) || value > 1.0) {
            AL.currentCtx.err = 40963;
            return;
          }
          src.maxGain = value;
          break;
        case 0x1020 /* AL_REFERENCE_DISTANCE */:
          if (!Number.isFinite(value) || value < 0.0) {
            AL.currentCtx.err = 40963;
            return;
          }
          src.refDistance = value;
          if (src.panner) {
            src.panner.refDistance = value;
          }
          break;
        case 0x1021 /* AL_ROLLOFF_FACTOR */:
          if (!Number.isFinite(value) || value < 0.0) {
            AL.currentCtx.err = 40963;
            return;
          }
          src.rolloffFactor = value;
          if (src.panner) {
            src.panner.rolloffFactor = value;
          }
          break;
        case 0x1022 /* AL_CONE_OUTER_GAIN */:
          if (!Number.isFinite(value) || value < 0.0 || value > 1.0) {
            AL.currentCtx.err = 40963;
            return;
          }
          src.coneOuterGain = value;
          if (src.panner) {
            src.panner.coneOuterGain = value;
          }
          break;
        case 0x1023 /* AL_MAX_DISTANCE */:
          if (!Number.isFinite(value) || value < 0.0) {
            AL.currentCtx.err = 40963;
            return;
          }
          src.maxDistance = value;
          if (src.panner) {
            src.panner.maxDistance = value;
          }
          break;
        case 0x1024 /* AL_SEC_OFFSET */:
          if (value < 0.0 || value > AL.sourceDuration(src)) {
            AL.currentCtx.err = 40963;
            return;
          }
  
          AL.sourceSeek(src, value);
          break;
        case 0x1025 /* AL_SAMPLE_OFFSET */:
          var srcLen = AL.sourceDuration(src);
          if (srcLen > 0.0) {
            var frequency;
            for (var bufId in src.bufQueue) {
              if (bufId) {
                frequency = src.bufQueue[bufId].frequency;
                break;
              }
            }
            value /= frequency;
          }
          if (value < 0.0 || value > srcLen) {
            AL.currentCtx.err = 40963;
            return;
          }
  
          AL.sourceSeek(src, value);
          break;
        case 0x1026 /* AL_BYTE_OFFSET */:
          var srcLen = AL.sourceDuration(src);
          if (srcLen > 0.0) {
            var bytesPerSec;
            for (var bufId in src.bufQueue) {
              if (bufId) {
                var buf = src.bufQueue[bufId];
                bytesPerSec = buf.frequency * buf.bytesPerSample * buf.channels;
                break;
              }
            }
            value /= bytesPerSec;
          }
          if (value < 0.0 || value > srcLen) {
            AL.currentCtx.err = 40963;
            return;
          }
  
          AL.sourceSeek(src, value);
          break;
        case 0x1214 /* AL_SOURCE_SPATIALIZE_SOFT */:
          if (value !== 0 && value !== 1 && value !== 2 /* AL_AUTO_SOFT */) {
            AL.currentCtx.err = 40963;
            return;
          }
  
          src.spatialize = value;
          AL.initSourcePanner(src);
          break;
        case 0x2009 /* AL_BYTE_LENGTH_SOFT */:
        case 0x200A /* AL_SAMPLE_LENGTH_SOFT */:
        case 0x200B /* AL_SEC_LENGTH_SOFT */:
          AL.currentCtx.err = 40964;
          break;
        case 53248:
          switch (value) {
          case 0:
          case 0xd001 /* AL_INVERSE_DISTANCE */:
          case 0xd002 /* AL_INVERSE_DISTANCE_CLAMPED */:
          case 0xd003 /* AL_LINEAR_DISTANCE */:
          case 0xd004 /* AL_LINEAR_DISTANCE_CLAMPED */:
          case 0xd005 /* AL_EXPONENT_DISTANCE */:
          case 0xd006 /* AL_EXPONENT_DISTANCE_CLAMPED */:
            src.distanceModel = value;
            if (AL.currentCtx.sourceDistanceModel) {
              AL.updateContextGlobal(AL.currentCtx);
            }
            break;
          default:
            AL.currentCtx.err = 40963;
            return;
          }
          break;
        default:
          AL.currentCtx.err = 40962;
          return;
        }
      },
  captures:{
  },
  sharedCaptureAudioCtx:null,
  requireValidCaptureDevice:(deviceId, funcname) => {
        if (deviceId === 0) {
          AL.alcErr = 40961;
          return null;
        }
        var c = AL.captures[deviceId];
        if (!c) {
          AL.alcErr = 40961;
          return null;
        }
        var err = c.mediaStreamError;
        if (err) {
          AL.alcErr = 40961;
          return null;
        }
        return c;
      },
  };
  var _alBufferData = (bufferId, format, pData, size, freq) => {
      if (!AL.currentCtx) {
        return;
      }
      var buf = AL.buffers[bufferId];
      if (!buf) {
        AL.currentCtx.err = 40963;
        return;
      }
      if (freq <= 0) {
        AL.currentCtx.err = 40963;
        return;
      }
  
      var audioBuf = null;
      try {
        switch (format) {
        case 0x1100 /* AL_FORMAT_MONO8 */:
          if (size > 0) {
            audioBuf = AL.currentCtx.audioCtx.createBuffer(1, size, freq);
            var channel0 = audioBuf.getChannelData(0);
            for (var i = 0; i < size; ++i) {
              channel0[i] = HEAPU8[pData++] * 0.0078125 /* 1/128 */ - 1.0;
            }
          }
          buf.bytesPerSample = 1;
          buf.channels = 1;
          buf.length = size;
          break;
        case 0x1101 /* AL_FORMAT_MONO16 */:
          if (size > 0) {
            audioBuf = AL.currentCtx.audioCtx.createBuffer(1, size >> 1, freq);
            var channel0 = audioBuf.getChannelData(0);
            pData >>= 1;
            for (var i = 0; i < size >> 1; ++i) {
              channel0[i] = HEAP16[pData++] * 0.000030517578125 /* 1/32768 */;
            }
          }
          buf.bytesPerSample = 2;
          buf.channels = 1;
          buf.length = size >> 1;
          break;
        case 0x1102 /* AL_FORMAT_STEREO8 */:
          if (size > 0) {
            audioBuf = AL.currentCtx.audioCtx.createBuffer(2, size >> 1, freq);
            var channel0 = audioBuf.getChannelData(0);
            var channel1 = audioBuf.getChannelData(1);
            for (var i = 0; i < size >> 1; ++i) {
              channel0[i] = HEAPU8[pData++] * 0.0078125 /* 1/128 */ - 1.0;
              channel1[i] = HEAPU8[pData++] * 0.0078125 /* 1/128 */ - 1.0;
            }
          }
          buf.bytesPerSample = 1;
          buf.channels = 2;
          buf.length = size >> 1;
          break;
        case 0x1103 /* AL_FORMAT_STEREO16 */:
          if (size > 0) {
            audioBuf = AL.currentCtx.audioCtx.createBuffer(2, size >> 2, freq);
            var channel0 = audioBuf.getChannelData(0);
            var channel1 = audioBuf.getChannelData(1);
            pData >>= 1;
            for (var i = 0; i < size >> 2; ++i) {
              channel0[i] = HEAP16[pData++] * 0.000030517578125 /* 1/32768 */;
              channel1[i] = HEAP16[pData++] * 0.000030517578125 /* 1/32768 */;
            }
          }
          buf.bytesPerSample = 2;
          buf.channels = 2;
          buf.length = size >> 2;
          break;
        case 0x10010 /* AL_FORMAT_MONO_FLOAT32 */:
          if (size > 0) {
            audioBuf = AL.currentCtx.audioCtx.createBuffer(1, size >> 2, freq);
            var channel0 = audioBuf.getChannelData(0);
            pData >>= 2;
            for (var i = 0; i < size >> 2; ++i) {
              channel0[i] = HEAPF32[pData++];
            }
          }
          buf.bytesPerSample = 4;
          buf.channels = 1;
          buf.length = size >> 2;
          break;
        case 0x10011 /* AL_FORMAT_STEREO_FLOAT32 */:
          if (size > 0) {
            audioBuf = AL.currentCtx.audioCtx.createBuffer(2, size >> 3, freq);
            var channel0 = audioBuf.getChannelData(0);
            var channel1 = audioBuf.getChannelData(1);
            pData >>= 2;
            for (var i = 0; i < size >> 3; ++i) {
              channel0[i] = HEAPF32[pData++];
              channel1[i] = HEAPF32[pData++];
            }
          }
          buf.bytesPerSample = 4;
          buf.channels = 2;
          buf.length = size >> 3;
          break;
        default:
          AL.currentCtx.err = 40963;
          return;
        }
        buf.frequency = freq;
        buf.audioBuf = audioBuf;
      } catch (e) {
        AL.currentCtx.err = 40963;
        return;
      }
    };

  var _alDeleteBuffers = (count, pBufferIds) => {
      if (!AL.currentCtx) {
        return;
      }
  
      for (var i = 0; i < count; ++i) {
        var bufId = HEAP32[(((pBufferIds)+(i*4))>>2)];
        /// Deleting the zero buffer is a legal NOP, so ignore it
        if (bufId === 0) {
          continue;
        }
  
        // Make sure the buffer index is valid.
        if (!AL.buffers[bufId]) {
          AL.currentCtx.err = 40961;
          return;
        }
  
        // Make sure the buffer is no longer in use.
        if (AL.buffers[bufId].refCount) {
          AL.currentCtx.err = 40964;
          return;
        }
      }
  
      for (var i = 0; i < count; ++i) {
        var bufId = HEAP32[(((pBufferIds)+(i*4))>>2)];
        if (bufId === 0) {
          continue;
        }
  
        AL.deviceRefCounts[AL.buffers[bufId].deviceId]--;
        delete AL.buffers[bufId];
        AL.freeIds.push(bufId);
      }
    };

  var _alGenBuffers = (count, pBufferIds) => {
      if (!AL.currentCtx) {
        return;
      }
  
      for (var i = 0; i < count; ++i) {
        var buf = {
          deviceId: AL.currentCtx.deviceId,
          id: AL.newId(),
          refCount: 0,
          audioBuf: null,
          frequency: 0,
          bytesPerSample: 2,
          channels: 1,
          length: 0,
        };
        AL.deviceRefCounts[buf.deviceId]++;
        AL.buffers[buf.id] = buf;
        HEAP32[(((pBufferIds)+(i*4))>>2)] = buf.id;
      }
    };

  var _alGenSources = (count, pSourceIds) => {
      if (!AL.currentCtx) {
        return;
      }
      for (var i = 0; i < count; ++i) {
        var gain = AL.currentCtx.audioCtx.createGain();
        gain.connect(AL.currentCtx.gain);
        var src = {
          context: AL.currentCtx,
          id: AL.newId(),
          type: 0x1030 /* AL_UNDETERMINED */,
          state: 4113,
          bufQueue: [AL.buffers[0]],
          audioQueue: [],
          looping: false,
          pitch: 1.0,
          dopplerShift: 1.0,
          gain,
          minGain: 0.0,
          maxGain: 1.0,
          panner: null,
          bufsProcessed: 0,
          bufStartTime: Number.NEGATIVE_INFINITY,
          bufOffset: 0.0,
          relative: false,
          refDistance: 1.0,
          maxDistance: 3.40282e38 /* FLT_MAX */,
          rolloffFactor: 1.0,
          position: [0.0, 0.0, 0.0],
          velocity: [0.0, 0.0, 0.0],
          direction: [0.0, 0.0, 0.0],
          coneOuterGain: 0.0,
          coneInnerAngle: 360.0,
          coneOuterAngle: 360.0,
          distanceModel: 0xd002 /* AL_INVERSE_DISTANCE_CLAMPED */,
          spatialize: 2 /* AL_AUTO_SOFT */,
  
          get playbackRate() {
            return this.pitch * this.dopplerShift;
          }
        };
        AL.currentCtx.sources[src.id] = src;
        HEAP32[(((pSourceIds)+(i*4))>>2)] = src.id;
      }
    };

  var _alGetError = () => {
      if (!AL.currentCtx) {
        return 40964;
      }
      // Reset error on get.
      var err = AL.currentCtx.err;
      AL.currentCtx.err = 0;
      return err;
    };

  var _alGetSourcei = (sourceId, param, pValue) => {
      var val = AL.getSourceParam('alGetSourcei', sourceId, param);
      if (val === null) {
        return;
      }
      if (!pValue) {
        AL.currentCtx.err = 40963;
        return;
      }
  
      switch (param) {
      case 0x202 /* AL_SOURCE_RELATIVE */:
      case 0x1001 /* AL_CONE_INNER_ANGLE */:
      case 0x1002 /* AL_CONE_OUTER_ANGLE */:
      case 0x1007 /* AL_LOOPING */:
      case 0x1009 /* AL_BUFFER */:
      case 0x1010 /* AL_SOURCE_STATE */:
      case 0x1015 /* AL_BUFFERS_QUEUED */:
      case 0x1016 /* AL_BUFFERS_PROCESSED */:
      case 0x1020 /* AL_REFERENCE_DISTANCE */:
      case 0x1021 /* AL_ROLLOFF_FACTOR */:
      case 0x1023 /* AL_MAX_DISTANCE */:
      case 0x1024 /* AL_SEC_OFFSET */:
      case 0x1025 /* AL_SAMPLE_OFFSET */:
      case 0x1026 /* AL_BYTE_OFFSET */:
      case 0x1027 /* AL_SOURCE_TYPE */:
      case 0x1214 /* AL_SOURCE_SPATIALIZE_SOFT */:
      case 0x2009 /* AL_BYTE_LENGTH_SOFT */:
      case 0x200A /* AL_SAMPLE_LENGTH_SOFT */:
      case 53248:
        HEAP32[((pValue)>>2)] = val;
        break;
      default:
        AL.currentCtx.err = 40962;
        return;
      }
    };

  var _alSourcePlay = (sourceId) => {
      if (!AL.currentCtx) {
        return;
      }
      var src = AL.currentCtx.sources[sourceId];
      if (!src) {
        AL.currentCtx.err = 40961;
        return;
      }
      AL.setSourceState(src, 4114);
    };

  var _alSourcef = (sourceId, param, value) => {
      switch (param) {
      case 0x1001 /* AL_CONE_INNER_ANGLE */:
      case 0x1002 /* AL_CONE_OUTER_ANGLE */:
      case 0x1003 /* AL_PITCH */:
      case 4106:
      case 0x100D /* AL_MIN_GAIN */:
      case 0x100E /* AL_MAX_GAIN */:
      case 0x1020 /* AL_REFERENCE_DISTANCE */:
      case 0x1021 /* AL_ROLLOFF_FACTOR */:
      case 0x1022 /* AL_CONE_OUTER_GAIN */:
      case 0x1023 /* AL_MAX_DISTANCE */:
      case 0x1024 /* AL_SEC_OFFSET */:
      case 0x1025 /* AL_SAMPLE_OFFSET */:
      case 0x1026 /* AL_BYTE_OFFSET */:
      case 0x200B /* AL_SEC_LENGTH_SOFT */:
        AL.setSourceParam('alSourcef', sourceId, param, value);
        break;
      default:
        AL.setSourceParam('alSourcef', sourceId, param, null);
        break;
      }
    };

  var _alSourcei = (sourceId, param, value) => {
      switch (param) {
      case 0x202 /* AL_SOURCE_RELATIVE */:
      case 0x1001 /* AL_CONE_INNER_ANGLE */:
      case 0x1002 /* AL_CONE_OUTER_ANGLE */:
      case 0x1007 /* AL_LOOPING */:
      case 0x1009 /* AL_BUFFER */:
      case 0x1020 /* AL_REFERENCE_DISTANCE */:
      case 0x1021 /* AL_ROLLOFF_FACTOR */:
      case 0x1023 /* AL_MAX_DISTANCE */:
      case 0x1024 /* AL_SEC_OFFSET */:
      case 0x1025 /* AL_SAMPLE_OFFSET */:
      case 0x1026 /* AL_BYTE_OFFSET */:
      case 0x1214 /* AL_SOURCE_SPATIALIZE_SOFT */:
      case 0x2009 /* AL_BYTE_LENGTH_SOFT */:
      case 0x200A /* AL_SAMPLE_LENGTH_SOFT */:
      case 53248:
        AL.setSourceParam('alSourcei', sourceId, param, value);
        break;
      default:
        AL.setSourceParam('alSourcei', sourceId, param, null);
        break;
      }
    };

  var _alcCloseDevice = (deviceId) => {
      if (!(deviceId in AL.deviceRefCounts) || AL.deviceRefCounts[deviceId] > 0) {
        return 0;
      }
  
      delete AL.deviceRefCounts[deviceId];
      AL.freeIds.push(deviceId);
      return 1;
    };

  var listenOnce = (object, event, func) => {
      object.addEventListener(event, func, { 'once': true });
    };
  /** @param {Object=} elements */
  var autoResumeAudioContext = (ctx, elements) => {
      if (!elements) {
        elements = [document, document.getElementById('canvas')];
      }
      ['keydown', 'mousedown', 'touchstart'].forEach((event) => {
        elements.forEach((element) => {
          if (element) {
            listenOnce(element, event, () => {
              if (ctx.state === 'suspended') ctx.resume();
            });
          }
        });
      });
    };
  
  var _alcCreateContext = (deviceId, pAttrList) => {
      if (!(deviceId in AL.deviceRefCounts)) {
        AL.alcErr = 0xA001; /* ALC_INVALID_DEVICE */
        return 0;
      }
  
      var options = null;
      var attrs = [];
      var hrtf = null;
      pAttrList >>= 2;
      if (pAttrList) {
        var attr = 0;
        var val = 0;
        while (true) {
          attr = HEAP32[pAttrList++];
          attrs.push(attr);
          if (attr === 0) {
            break;
          }
          val = HEAP32[pAttrList++];
          attrs.push(val);
  
          switch (attr) {
          case 0x1007 /* ALC_FREQUENCY */:
            if (!options) {
              options = {};
            }
  
            options.sampleRate = val;
            break;
          case 0x1010 /* ALC_MONO_SOURCES */: // fallthrough
          case 0x1011 /* ALC_STEREO_SOURCES */:
            // Do nothing; these hints are satisfied by default
            break
          case 0x1992 /* ALC_HRTF_SOFT */:
            switch (val) {
              case 0:
                hrtf = false;
                break;
              case 1:
                hrtf = true;
                break;
              case 2 /* ALC_DONT_CARE_SOFT */:
                break;
              default:
                AL.alcErr = 40964;
                return 0;
            }
            break;
          case 0x1996 /* ALC_HRTF_ID_SOFT */:
            if (val !== 0) {
              AL.alcErr = 40964;
              return 0;
            }
            break;
          default:
            AL.alcErr = 0xA004; /* ALC_INVALID_VALUE */
            return 0;
          }
        }
      }
  
      var AudioContext = window.AudioContext || window.webkitAudioContext;
      var ac = null;
      try {
        // Only try to pass options if there are any, for compat with browsers that don't support this
        if (options) {
          ac = new AudioContext(options);
        } else {
          ac = new AudioContext();
        }
      } catch (e) {
        if (e.name === 'NotSupportedError') {
          AL.alcErr = 0xA004; /* ALC_INVALID_VALUE */
        } else {
          AL.alcErr = 0xA001; /* ALC_INVALID_DEVICE */
        }
  
        return 0;
      }
  
      autoResumeAudioContext(ac);
  
      // Old Web Audio API (e.g. Safari 6.0.5) had an inconsistently named createGainNode function.
      if (typeof ac.createGain == 'undefined') {
        ac.createGain = ac.createGainNode;
      }
  
      var gain = ac.createGain();
      gain.connect(ac.destination);
      var ctx = {
        deviceId,
        id: AL.newId(),
        attrs,
        audioCtx: ac,
        listener: {
          position: [0.0, 0.0, 0.0],
          velocity: [0.0, 0.0, 0.0],
          direction: [0.0, 0.0, 0.0],
          up: [0.0, 0.0, 0.0]
        },
        sources: [],
        interval: setInterval(() => AL.scheduleContextAudio(ctx), AL.QUEUE_INTERVAL),
        gain,
        distanceModel: 0xd002 /* AL_INVERSE_DISTANCE_CLAMPED */,
        speedOfSound: 343.3,
        dopplerFactor: 1.0,
        sourceDistanceModel: false,
        hrtf: hrtf || false,
  
        _err: 0,
        get err() {
          return this._err;
        },
        set err(val) {
          // Errors should not be overwritten by later errors until they are cleared by a query.
          if (this._err === 0 || val === 0) {
            this._err = val;
          }
        }
      };
      AL.deviceRefCounts[deviceId]++;
      AL.contexts[ctx.id] = ctx;
  
      if (hrtf !== null) {
        // Apply hrtf attrib to all contexts for this device
        for (var ctxId in AL.contexts) {
          var c = AL.contexts[ctxId];
          if (c.deviceId === deviceId) {
            c.hrtf = hrtf;
            AL.updateContextGlobal(c);
          }
        }
      }
  
      return ctx.id;
    };

  var _alcDestroyContext = (contextId) => {
      var ctx = AL.contexts[contextId];
      if (AL.currentCtx === ctx) {
        AL.alcErr = 0xA002 /* ALC_INVALID_CONTEXT */;
        return;
      }
  
      // Stop playback, etc
      if (AL.contexts[contextId].interval) {
        clearInterval(AL.contexts[contextId].interval);
      }
      AL.deviceRefCounts[ctx.deviceId]--;
      delete AL.contexts[contextId];
      AL.freeIds.push(contextId);
    };

  
  
  var stringToNewUTF8 = (str) => {
      var size = lengthBytesUTF8(str) + 1;
      var ret = _malloc(size);
      if (ret) stringToUTF8(str, ret, size);
      return ret;
    };
  
  var _alcGetString = (deviceId, param) => {
      if (AL.alcStringCache[param]) {
        return AL.alcStringCache[param];
      }
  
      var ret;
      switch (param) {
      case 0:
        ret = 'No Error';
        break;
      case 40961:
        ret = 'Invalid Device';
        break;
      case 0xA002 /* ALC_INVALID_CONTEXT */:
        ret = 'Invalid Context';
        break;
      case 40963:
        ret = 'Invalid Enum';
        break;
      case 40964:
        ret = 'Invalid Value';
        break;
      case 0xA005 /* ALC_OUT_OF_MEMORY */:
        ret = 'Out of Memory';
        break;
      case 0x1004 /* ALC_DEFAULT_DEVICE_SPECIFIER */:
        if (typeof AudioContext != 'undefined' ||
            typeof webkitAudioContext != 'undefined') {
          ret = AL.DEVICE_NAME;
        } else {
          return 0;
        }
        break;
      case 0x1005 /* ALC_DEVICE_SPECIFIER */:
        if (typeof AudioContext != 'undefined' ||
            typeof webkitAudioContext != 'undefined') {
          ret = AL.DEVICE_NAME.concat('\0');
        } else {
          ret = '\0';
        }
        break;
      case 0x311 /* ALC_CAPTURE_DEFAULT_DEVICE_SPECIFIER */:
        ret = AL.CAPTURE_DEVICE_NAME;
        break;
      case 0x310 /* ALC_CAPTURE_DEVICE_SPECIFIER */:
        if (deviceId === 0)
          ret = AL.CAPTURE_DEVICE_NAME.concat('\0');
          else {
          var c = AL.requireValidCaptureDevice(deviceId, 'alcGetString');
          if (!c) {
            return 0;
          }
          ret = c.deviceName;
        }
        break;
      case 0x1006 /* ALC_EXTENSIONS */:
        if (!deviceId) {
          AL.alcErr = 40961;
          return 0;
        }
  
        ret = '';
        for (var ext in AL.ALC_EXTENSIONS) {
          ret = ret.concat(ext);
          ret = ret.concat(' ');
        }
        ret = ret.trim();
        break;
      default:
        AL.alcErr = 40963;
        return 0;
      }
  
      ret = stringToNewUTF8(ret);
      AL.alcStringCache[param] = ret;
      return ret;
    };

  var _alcMakeContextCurrent = (contextId) => {
      if (contextId === 0) {
        AL.currentCtx = null;
      } else {
        AL.currentCtx = AL.contexts[contextId];
      }
      return 1;
    };

  
  var _alcOpenDevice = (pDeviceName) => {
      if (pDeviceName) {
        var name = UTF8ToString(pDeviceName);
        if (name !== AL.DEVICE_NAME) {
          return 0;
        }
      }
  
      if (typeof AudioContext != 'undefined' || typeof webkitAudioContext != 'undefined') {
        var deviceId = AL.newId();
        AL.deviceRefCounts[deviceId] = 0;
        return deviceId;
      }
      return 0;
    };

  var _emscripten_date_now = () => Date.now();


  var _emscripten_is_main_browser_thread = () =>
      !ENVIRONMENT_IS_WORKER;

  var _emscripten_memcpy_js = (dest, src, num) => HEAPU8.copyWithin(dest, src, src + num);

  var getHeapMax = () =>
      // Stay one Wasm page short of 4GB: while e.g. Chrome is able to allocate
      // full 4GB Wasm memories, the size will wrap back to 0 bytes in Wasm side
      // for any code that deals with heap sizes, which would require special
      // casing all heap size related code to treat 0 specially.
      2147483648;
  
  var growMemory = (size) => {
      var b = wasmMemory.buffer;
      var pages = (size - b.byteLength + 65535) / 65536;
      try {
        // round size grow request up to wasm page size (fixed 64KB per spec)
        wasmMemory.grow(pages); // .grow() takes a delta compared to the previous size
        updateMemoryViews();
        return 1 /*success*/;
      } catch(e) {
        err(`growMemory: Attempted to grow heap from ${b.byteLength} bytes to ${size} bytes, but got error: ${e}`);
      }
      // implicit 0 return to save code size (caller will cast "undefined" into 0
      // anyhow)
    };
  var _emscripten_resize_heap = (requestedSize) => {
      var oldSize = HEAPU8.length;
      // With CAN_ADDRESS_2GB or MEMORY64, pointers are already unsigned.
      requestedSize >>>= 0;
      // With multithreaded builds, races can happen (another thread might increase the size
      // in between), so return a failure, and let the caller retry.
      assert(requestedSize > oldSize);
  
      // Memory resize rules:
      // 1.  Always increase heap size to at least the requested size, rounded up
      //     to next page multiple.
      // 2a. If MEMORY_GROWTH_LINEAR_STEP == -1, excessively resize the heap
      //     geometrically: increase the heap size according to
      //     MEMORY_GROWTH_GEOMETRIC_STEP factor (default +20%), At most
      //     overreserve by MEMORY_GROWTH_GEOMETRIC_CAP bytes (default 96MB).
      // 2b. If MEMORY_GROWTH_LINEAR_STEP != -1, excessively resize the heap
      //     linearly: increase the heap size by at least
      //     MEMORY_GROWTH_LINEAR_STEP bytes.
      // 3.  Max size for the heap is capped at 2048MB-WASM_PAGE_SIZE, or by
      //     MAXIMUM_MEMORY, or by ASAN limit, depending on which is smallest
      // 4.  If we were unable to allocate as much memory, it may be due to
      //     over-eager decision to excessively reserve due to (3) above.
      //     Hence if an allocation fails, cut down on the amount of excess
      //     growth, in an attempt to succeed to perform a smaller allocation.
  
      // A limit is set for how much we can grow. We should not exceed that
      // (the wasm binary specifies it, so if we tried, we'd fail anyhow).
      var maxHeapSize = getHeapMax();
      if (requestedSize > maxHeapSize) {
        err(`Cannot enlarge memory, requested ${requestedSize} bytes, but the limit is ${maxHeapSize} bytes!`);
        return false;
      }
  
      var alignUp = (x, multiple) => x + (multiple - x % multiple) % multiple;
  
      // Loop through potential heap size increases. If we attempt a too eager
      // reservation that fails, cut down on the attempted size and reserve a
      // smaller bump instead. (max 3 times, chosen somewhat arbitrarily)
      for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
        var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown); // ensure geometric growth
        // but limit overreserving (default to capping at +96MB overgrowth at most)
        overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296 );
  
        var newSize = Math.min(maxHeapSize, alignUp(Math.max(requestedSize, overGrownHeapSize), 65536));
  
        var replacement = growMemory(newSize);
        if (replacement) {
  
          return true;
        }
      }
      err(`Failed to grow the heap from ${oldSize} bytes to ${newSize} bytes, not enough memory!`);
      return false;
    };

  
  var withStackSave = (f) => {
      var stack = stackSave();
      var ret = f();
      stackRestore(stack);
      return ret;
    };
  var JSEvents = {
  removeAllEventListeners() {
        while (JSEvents.eventHandlers.length) {
          JSEvents._removeHandler(JSEvents.eventHandlers.length - 1);
        }
        JSEvents.deferredCalls = [];
      },
  inEventHandler:0,
  deferredCalls:[],
  deferCall(targetFunction, precedence, argsList) {
        function arraysHaveEqualContent(arrA, arrB) {
          if (arrA.length != arrB.length) return false;
  
          for (var i in arrA) {
            if (arrA[i] != arrB[i]) return false;
          }
          return true;
        }
        // Test if the given call was already queued, and if so, don't add it again.
        for (var i in JSEvents.deferredCalls) {
          var call = JSEvents.deferredCalls[i];
          if (call.targetFunction == targetFunction && arraysHaveEqualContent(call.argsList, argsList)) {
            return;
          }
        }
        JSEvents.deferredCalls.push({
          targetFunction,
          precedence,
          argsList
        });
  
        JSEvents.deferredCalls.sort((x,y) => x.precedence < y.precedence);
      },
  removeDeferredCalls(targetFunction) {
        for (var i = 0; i < JSEvents.deferredCalls.length; ++i) {
          if (JSEvents.deferredCalls[i].targetFunction == targetFunction) {
            JSEvents.deferredCalls.splice(i, 1);
            --i;
          }
        }
      },
  canPerformEventHandlerRequests() {
        if (navigator.userActivation) {
          // Verify against transient activation status from UserActivation API
          // whether it is possible to perform a request here without needing to defer. See
          // https://developer.mozilla.org/en-US/docs/Web/Security/User_activation#transient_activation
          // and https://caniuse.com/mdn-api_useractivation
          // At the time of writing, Firefox does not support this API: https://bugzilla.mozilla.org/show_bug.cgi?id=1791079
          return navigator.userActivation.isActive;
        }
  
        return JSEvents.inEventHandler && JSEvents.currentEventHandler.allowsDeferredCalls;
      },
  runDeferredCalls() {
        if (!JSEvents.canPerformEventHandlerRequests()) {
          return;
        }
        for (var i = 0; i < JSEvents.deferredCalls.length; ++i) {
          var call = JSEvents.deferredCalls[i];
          JSEvents.deferredCalls.splice(i, 1);
          --i;
          call.targetFunction(...call.argsList);
        }
      },
  eventHandlers:[],
  removeAllHandlersOnTarget:(target, eventTypeString) => {
        for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
          if (JSEvents.eventHandlers[i].target == target &&
            (!eventTypeString || eventTypeString == JSEvents.eventHandlers[i].eventTypeString)) {
             JSEvents._removeHandler(i--);
           }
        }
      },
  _removeHandler(i) {
        var h = JSEvents.eventHandlers[i];
        h.target.removeEventListener(h.eventTypeString, h.eventListenerFunc, h.useCapture);
        JSEvents.eventHandlers.splice(i, 1);
      },
  registerOrRemoveHandler(eventHandler) {
        if (!eventHandler.target) {
          err('registerOrRemoveHandler: the target element for event handler registration does not exist, when processing the following event handler registration:');
          console.dir(eventHandler);
          return -4;
        }
        if (eventHandler.callbackfunc) {
          eventHandler.eventListenerFunc = function(event) {
            // Increment nesting count for the event handler.
            ++JSEvents.inEventHandler;
            JSEvents.currentEventHandler = eventHandler;
            // Process any old deferred calls the user has placed.
            JSEvents.runDeferredCalls();
            // Process the actual event, calls back to user C code handler.
            eventHandler.handlerFunc(event);
            // Process any new deferred calls that were placed right now from this event handler.
            JSEvents.runDeferredCalls();
            // Out of event handler - restore nesting count.
            --JSEvents.inEventHandler;
          };
  
          eventHandler.target.addEventListener(eventHandler.eventTypeString,
                                               eventHandler.eventListenerFunc,
                                               eventHandler.useCapture);
          JSEvents.eventHandlers.push(eventHandler);
        } else {
          for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
            if (JSEvents.eventHandlers[i].target == eventHandler.target
             && JSEvents.eventHandlers[i].eventTypeString == eventHandler.eventTypeString) {
               JSEvents._removeHandler(i--);
             }
          }
        }
        return 0;
      },
  getNodeNameForTarget(target) {
        if (!target) return '';
        if (target == window) return '#window';
        if (target == screen) return '#screen';
        return target?.nodeName || '';
      },
  fullscreenEnabled() {
        return document.fullscreenEnabled
        // Safari 13.0.3 on macOS Catalina 10.15.1 still ships with prefixed webkitFullscreenEnabled.
        // TODO: If Safari at some point ships with unprefixed version, update the version check above.
        || document.webkitFullscreenEnabled
         ;
      },
  };
  
  var maybeCStringToJsString = (cString) => {
      // "cString > 2" checks if the input is a number, and isn't of the special
      // values we accept here, EMSCRIPTEN_EVENT_TARGET_* (which map to 0, 1, 2).
      // In other words, if cString > 2 then it's a pointer to a valid place in
      // memory, and points to a C string.
      return cString > 2 ? UTF8ToString(cString) : cString;
    };
  
  var specialHTMLTargets = [0, typeof document != 'undefined' ? document : 0, typeof window != 'undefined' ? window : 0];
  var findEventTarget = (target) => {
      target = maybeCStringToJsString(target);
      var domElement = specialHTMLTargets[target] || (typeof document != 'undefined' ? document.querySelector(target) : undefined);
      return domElement;
    };
  
  
  var registerFocusEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      if (!JSEvents.focusEvent) JSEvents.focusEvent = _malloc(256);
  
      var focusEventHandlerFunc = (e = event) => {
        var nodeName = JSEvents.getNodeNameForTarget(e.target);
        var id = e.target.id ? e.target.id : '';
  
        var focusEvent = JSEvents.focusEvent;
        stringToUTF8(nodeName, focusEvent + 0, 128);
        stringToUTF8(id, focusEvent + 128, 128);
  
        if (((a1, a2, a3) => dynCall_iiii(callbackfunc, a1, a2, a3))(eventTypeId, focusEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target: findEventTarget(target),
        eventTypeString,
        callbackfunc,
        handlerFunc: focusEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  var _emscripten_set_blur_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerFocusEventCallback(target, userData, useCapture, callbackfunc, 12, "blur", targetThread);

  var _emscripten_set_focus_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerFocusEventCallback(target, userData, useCapture, callbackfunc, 13, "focus", targetThread);

  
  
  
  var registerKeyEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      if (!JSEvents.keyEvent) JSEvents.keyEvent = _malloc(176);
  
      var keyEventHandlerFunc = (e) => {
        assert(e);
  
        var keyEventData = JSEvents.keyEvent;
        HEAPF64[((keyEventData)>>3)] = e.timeStamp;
  
        var idx =((keyEventData)>>2);
  
        HEAP32[idx + 2] = e.location;
        HEAP32[idx + 3] = e.ctrlKey;
        HEAP32[idx + 4] = e.shiftKey;
        HEAP32[idx + 5] = e.altKey;
        HEAP32[idx + 6] = e.metaKey;
        HEAP32[idx + 7] = e.repeat;
        HEAP32[idx + 8] = e.charCode;
        HEAP32[idx + 9] = e.keyCode;
        HEAP32[idx + 10] = e.which;
        stringToUTF8(e.key || '', keyEventData + 44, 32);
        stringToUTF8(e.code || '', keyEventData + 76, 32);
        stringToUTF8(e.char || '', keyEventData + 108, 32);
        stringToUTF8(e.locale || '', keyEventData + 140, 32);
  
        if (((a1, a2, a3) => dynCall_iiii(callbackfunc, a1, a2, a3))(eventTypeId, keyEventData, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target: findEventTarget(target),
        eventTypeString,
        callbackfunc,
        handlerFunc: keyEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  var _emscripten_set_keydown_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerKeyEventCallback(target, userData, useCapture, callbackfunc, 2, "keydown", targetThread);

  var _emscripten_set_keypress_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerKeyEventCallback(target, userData, useCapture, callbackfunc, 1, "keypress", targetThread);

  var _emscripten_set_keyup_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerKeyEventCallback(target, userData, useCapture, callbackfunc, 3, "keyup", targetThread);

  
  
  var getBoundingClientRect = (e) => specialHTMLTargets.indexOf(e) < 0 ? e.getBoundingClientRect() : {'left':0,'top':0};
  
  var fillMouseEventData = (eventStruct, e, target) => {
      assert(eventStruct % 4 == 0);
      HEAPF64[((eventStruct)>>3)] = e.timeStamp;
      var idx = ((eventStruct)>>2);
      HEAP32[idx + 2] = e.screenX;
      HEAP32[idx + 3] = e.screenY;
      HEAP32[idx + 4] = e.clientX;
      HEAP32[idx + 5] = e.clientY;
      HEAP32[idx + 6] = e.ctrlKey;
      HEAP32[idx + 7] = e.shiftKey;
      HEAP32[idx + 8] = e.altKey;
      HEAP32[idx + 9] = e.metaKey;
      HEAP16[idx*2 + 20] = e.button;
      HEAP16[idx*2 + 21] = e.buttons;
  
      HEAP32[idx + 11] = e["movementX"]
        ;
  
      HEAP32[idx + 12] = e["movementY"]
        ;
  
      var rect = getBoundingClientRect(target);
      HEAP32[idx + 13] = e.clientX - rect.left;
      HEAP32[idx + 14] = e.clientY - rect.top;
  
    };
  
  
  var registerMouseEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      if (!JSEvents.mouseEvent) JSEvents.mouseEvent = _malloc(72);
      target = findEventTarget(target);
  
      var mouseEventHandlerFunc = (e = event) => {
        // TODO: Make this access thread safe, or this could update live while app is reading it.
        fillMouseEventData(JSEvents.mouseEvent, e, target);
  
        if (((a1, a2, a3) => dynCall_iiii(callbackfunc, a1, a2, a3))(eventTypeId, JSEvents.mouseEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target,
        allowsDeferredCalls: eventTypeString != 'mousemove' && eventTypeString != 'mouseenter' && eventTypeString != 'mouseleave', // Mouse move events do not allow fullscreen/pointer lock requests to be handled in them!
        eventTypeString,
        callbackfunc,
        handlerFunc: mouseEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  var _emscripten_set_mousedown_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerMouseEventCallback(target, userData, useCapture, callbackfunc, 5, "mousedown", targetThread);

  var _emscripten_set_mousemove_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerMouseEventCallback(target, userData, useCapture, callbackfunc, 8, "mousemove", targetThread);

  var _emscripten_set_mouseup_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerMouseEventCallback(target, userData, useCapture, callbackfunc, 6, "mouseup", targetThread);

  
  
  var registerUiEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      if (!JSEvents.uiEvent) JSEvents.uiEvent = _malloc(36);
  
      target = findEventTarget(target);
  
      var uiEventHandlerFunc = (e = event) => {
        if (e.target != target) {
          // Never take ui events such as scroll via a 'bubbled' route, but always from the direct element that
          // was targeted. Otherwise e.g. if app logs a message in response to a page scroll, the Emscripten log
          // message box could cause to scroll, generating a new (bubbled) scroll message, causing a new log print,
          // causing a new scroll, etc..
          return;
        }
        var b = document.body; // Take document.body to a variable, Closure compiler does not outline access to it on its own.
        if (!b) {
          // During a page unload 'body' can be null, with "Cannot read property 'clientWidth' of null" being thrown
          return;
        }
        var uiEvent = JSEvents.uiEvent;
        HEAP32[((uiEvent)>>2)] = e.detail;
        HEAP32[(((uiEvent)+(4))>>2)] = b.clientWidth;
        HEAP32[(((uiEvent)+(8))>>2)] = b.clientHeight;
        HEAP32[(((uiEvent)+(12))>>2)] = innerWidth;
        HEAP32[(((uiEvent)+(16))>>2)] = innerHeight;
        HEAP32[(((uiEvent)+(20))>>2)] = outerWidth;
        HEAP32[(((uiEvent)+(24))>>2)] = outerHeight;
        HEAP32[(((uiEvent)+(28))>>2)] = pageXOffset;
        HEAP32[(((uiEvent)+(32))>>2)] = pageYOffset;
        if (((a1, a2, a3) => dynCall_iiii(callbackfunc, a1, a2, a3))(eventTypeId, uiEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target,
        eventTypeString,
        callbackfunc,
        handlerFunc: uiEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  var _emscripten_set_resize_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerUiEventCallback(target, userData, useCapture, callbackfunc, 10, "resize", targetThread);

  
  
  
  
  var registerWheelEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      if (!JSEvents.wheelEvent) JSEvents.wheelEvent = _malloc(104);
  
      // The DOM Level 3 events spec event 'wheel'
      var wheelHandlerFunc = (e = event) => {
        var wheelEvent = JSEvents.wheelEvent;
        fillMouseEventData(wheelEvent, e, target);
        HEAPF64[(((wheelEvent)+(72))>>3)] = e["deltaX"];
        HEAPF64[(((wheelEvent)+(80))>>3)] = e["deltaY"];
        HEAPF64[(((wheelEvent)+(88))>>3)] = e["deltaZ"];
        HEAP32[(((wheelEvent)+(96))>>2)] = e["deltaMode"];
        if (((a1, a2, a3) => dynCall_iiii(callbackfunc, a1, a2, a3))(eventTypeId, wheelEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target,
        allowsDeferredCalls: true,
        eventTypeString,
        callbackfunc,
        handlerFunc: wheelHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  
  var _emscripten_set_wheel_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => {
      target = findEventTarget(target);
      if (!target) return -4;
      if (typeof target.onwheel != 'undefined') {
        return registerWheelEventCallback(target, userData, useCapture, callbackfunc, 9, "wheel", targetThread);
      } else {
        return -1;
      }
    };

  var _emscripten_sleep = (ms) => {
      // emscripten_sleep() does not return a value, but we still need a |return|
      // here for stack switching support (ASYNCIFY=2). In that mode this function
      // returns a Promise instead of nothing, and that Promise is what tells the
      // wasm VM to pause the stack.
      return Asyncify.handleSleep((wakeUp) => safeSetTimeout(wakeUp, ms));
    };
  _emscripten_sleep.isAsync = true;

  
  
  class HandleAllocator {
      constructor() {
        // TODO(sbc): Use class fields once we allow/enable es2022 in
        // JavaScript input to acorn and closure.
        // Reserve slot 0 so that 0 is always an invalid handle
        this.allocated = [undefined];
        this.freelist = [];
      }
      get(id) {
        assert(this.allocated[id] !== undefined, `invalid handle: ${id}`);
        return this.allocated[id];
      };
      has(id) {
        return this.allocated[id] !== undefined;
      };
      allocate(handle) {
        var id = this.freelist.pop() || this.allocated.length;
        this.allocated[id] = handle;
        return id;
      };
      free(id) {
        assert(this.allocated[id] !== undefined);
        // Set the slot to `undefined` rather than using `delete` here since
        // apparently arrays with holes in them can be less efficient.
        this.allocated[id] = undefined;
        this.freelist.push(id);
      };
    }
  var Fetch = {
  openDatabase(dbname, dbversion, onsuccess, onerror) {
      try {
        var openRequest = indexedDB.open(dbname, dbversion);
      } catch (e) {
        return onerror(e);
      }
  
      openRequest.onupgradeneeded = (event) => {
        var db = /** @type {IDBDatabase} */ (event.target.result);
        if (db.objectStoreNames.contains('FILES')) {
          db.deleteObjectStore('FILES');
        }
        db.createObjectStore('FILES');
      };
      openRequest.onsuccess = (event) => onsuccess(event.target.result);
      openRequest.onerror = onerror;
    },
  init() {
      Fetch.xhrs = new HandleAllocator();
      var onsuccess = (db) => {
        Fetch.dbInstance = db;
        removeRunDependency('library_fetch_init');
      };
  
      var onerror = () => {
        Fetch.dbInstance = false;
        removeRunDependency('library_fetch_init');
      };
  
      addRunDependency('library_fetch_init');
      Fetch.openDatabase('emscripten_filesystem', 1, onsuccess, onerror);
    },
  };
  
  function fetchXHR(fetch, onsuccess, onerror, onprogress, onreadystatechange) {
    var url = HEAPU32[(((fetch)+(8))>>2)];
    if (!url) {
      onerror(fetch, 0, 'no url specified!');
      return;
    }
    var url_ = UTF8ToString(url);
  
    var fetch_attr = fetch + 112;
    var requestMethod = UTF8ToString(fetch_attr + 0);
    requestMethod ||= 'GET';
    var timeoutMsecs = HEAPU32[(((fetch_attr)+(56))>>2)];
    var userName = HEAPU32[(((fetch_attr)+(68))>>2)];
    var password = HEAPU32[(((fetch_attr)+(72))>>2)];
    var requestHeaders = HEAPU32[(((fetch_attr)+(76))>>2)];
    var overriddenMimeType = HEAPU32[(((fetch_attr)+(80))>>2)];
    var dataPtr = HEAPU32[(((fetch_attr)+(84))>>2)];
    var dataLength = HEAPU32[(((fetch_attr)+(88))>>2)];
  
    var fetchAttributes = HEAPU32[(((fetch_attr)+(52))>>2)];
    var fetchAttrLoadToMemory = !!(fetchAttributes & 1);
    var fetchAttrStreamData = !!(fetchAttributes & 2);
    var fetchAttrSynchronous = !!(fetchAttributes & 64);
  
    var userNameStr = userName ? UTF8ToString(userName) : undefined;
    var passwordStr = password ? UTF8ToString(password) : undefined;
  
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = !!HEAPU8[(fetch_attr)+(60)];;
    xhr.open(requestMethod, url_, !fetchAttrSynchronous, userNameStr, passwordStr);
    if (!fetchAttrSynchronous) xhr.timeout = timeoutMsecs; // XHR timeout field is only accessible in async XHRs, and must be set after .open() but before .send().
    xhr.url_ = url_; // Save the url for debugging purposes (and for comparing to the responseURL that server side advertised)
    assert(!fetchAttrStreamData, 'streaming uses moz-chunked-arraybuffer which is no longer supported; TODO: rewrite using fetch()');
    xhr.responseType = 'arraybuffer';
  
    if (overriddenMimeType) {
      var overriddenMimeTypeStr = UTF8ToString(overriddenMimeType);
      xhr.overrideMimeType(overriddenMimeTypeStr);
    }
    if (requestHeaders) {
      for (;;) {
        var key = HEAPU32[((requestHeaders)>>2)];
        if (!key) break;
        var value = HEAPU32[(((requestHeaders)+(4))>>2)];
        if (!value) break;
        requestHeaders += 8;
        var keyStr = UTF8ToString(key);
        var valueStr = UTF8ToString(value);
        xhr.setRequestHeader(keyStr, valueStr);
      }
    }
  
    var id = Fetch.xhrs.allocate(xhr);
    HEAPU32[((fetch)>>2)] = id;
    var data = (dataPtr && dataLength) ? HEAPU8.slice(dataPtr, dataPtr + dataLength) : null;
    // TODO: Support specifying custom headers to the request.
  
    // Share the code to save the response, as we need to do so both on success
    // and on error (despite an error, there may be a response, like a 404 page).
    // This receives a condition, which determines whether to save the xhr's
    // response, or just 0.
    function saveResponseAndStatus() {
      var ptr = 0;
      var ptrLen = 0;
      if (xhr.response && fetchAttrLoadToMemory && HEAPU32[(((fetch)+(12))>>2)] === 0) {
        ptrLen = xhr.response.byteLength;
      }
      if (ptrLen > 0) {
        // The data pointer malloc()ed here has the same lifetime as the emscripten_fetch_t structure itself has, and is
        // freed when emscripten_fetch_close() is called.
        ptr = _malloc(ptrLen);
        HEAPU8.set(new Uint8Array(/** @type{Array<number>} */(xhr.response)), ptr);
      }
      HEAPU32[(((fetch)+(12))>>2)] = ptr
      writeI53ToI64(fetch + 16, ptrLen);
      writeI53ToI64(fetch + 24, 0);
      var len = xhr.response ? xhr.response.byteLength : 0;
      if (len) {
        // If the final XHR.onload handler receives the bytedata to compute total length, report that,
        // otherwise don't write anything out here, which will retain the latest byte size reported in
        // the most recent XHR.onprogress handler.
        writeI53ToI64(fetch + 32, len);
      }
      HEAP16[(((fetch)+(40))>>1)] = xhr.readyState
      HEAP16[(((fetch)+(42))>>1)] = xhr.status
      if (xhr.statusText) stringToUTF8(xhr.statusText, fetch + 44, 64);
    }
  
    xhr.onload = (e) => {
      // check if xhr was aborted by user and don't try to call back
      if (!Fetch.xhrs.has(id)) {
        return;
      }
      saveResponseAndStatus();
      if (xhr.status >= 200 && xhr.status < 300) {
        onsuccess?.(fetch, xhr, e);
      } else {
        onerror?.(fetch, xhr, e);
      }
    };
    xhr.onerror = (e) => {
      // check if xhr was aborted by user and don't try to call back
      if (!Fetch.xhrs.has(id)) {
        return;
      }
      saveResponseAndStatus();
      onerror?.(fetch, xhr, e);
    };
    xhr.ontimeout = (e) => {
      // check if xhr was aborted by user and don't try to call back
      if (!Fetch.xhrs.has(id)) {
        return;
      }
      onerror?.(fetch, xhr, e);
    };
    xhr.onprogress = (e) => {
      // check if xhr was aborted by user and don't try to call back
      if (!Fetch.xhrs.has(id)) {
        return;
      }
      var ptrLen = (fetchAttrLoadToMemory && fetchAttrStreamData && xhr.response) ? xhr.response.byteLength : 0;
      var ptr = 0;
      if (ptrLen > 0 && fetchAttrLoadToMemory && fetchAttrStreamData) {
        assert(onprogress, 'When doing a streaming fetch, you should have an onprogress handler registered to receive the chunks!');
        // Allocate byte data in Emscripten heap for the streamed memory block (freed immediately after onprogress call)
        ptr = _malloc(ptrLen);
        HEAPU8.set(new Uint8Array(/** @type{Array<number>} */(xhr.response)), ptr);
      }
      HEAPU32[(((fetch)+(12))>>2)] = ptr
      writeI53ToI64(fetch + 16, ptrLen);
      writeI53ToI64(fetch + 24, e.loaded - ptrLen);
      writeI53ToI64(fetch + 32, e.total);
      HEAP16[(((fetch)+(40))>>1)] = xhr.readyState
      // If loading files from a source that does not give HTTP status code, assume success if we get data bytes
      if (xhr.readyState >= 3 && xhr.status === 0 && e.loaded > 0) xhr.status = 200;
      HEAP16[(((fetch)+(42))>>1)] = xhr.status
      if (xhr.statusText) stringToUTF8(xhr.statusText, fetch + 44, 64);
      onprogress?.(fetch, xhr, e);
      if (ptr) {
        _free(ptr);
      }
    };
    xhr.onreadystatechange = (e) => {
      // check if xhr was aborted by user and don't try to call back
      if (!Fetch.xhrs.has(id)) {
        
        return;
      }
      HEAP16[(((fetch)+(40))>>1)] = xhr.readyState
      if (xhr.readyState >= 2) {
        HEAP16[(((fetch)+(42))>>1)] = xhr.status
      }
      onreadystatechange?.(fetch, xhr, e);
    };
    try {
      xhr.send(data);
    } catch(e) {
      onerror?.(fetch, xhr, e);
    }
  }
  
  
  var readI53FromI64 = (ptr) => {
      return HEAPU32[((ptr)>>2)] + HEAP32[(((ptr)+(4))>>2)] * 4294967296;
    };
  
  var readI53FromU64 = (ptr) => {
      return HEAPU32[((ptr)>>2)] + HEAPU32[(((ptr)+(4))>>2)] * 4294967296;
    };
  var writeI53ToI64 = (ptr, num) => {
      HEAPU32[((ptr)>>2)] = num;
      var lower = HEAPU32[((ptr)>>2)];
      HEAPU32[(((ptr)+(4))>>2)] = (num - lower)/4294967296;
      var deserialized = (num >= 0) ? readI53FromU64(ptr) : readI53FromI64(ptr);
      var offset = ((ptr)>>2);
      if (deserialized != num) warnOnce(`writeI53ToI64() out of range: serialized JS Number ${num} to Wasm heap as bytes lo=${ptrToString(HEAPU32[offset])}, hi=${ptrToString(HEAPU32[offset+1])}, which deserializes back to ${deserialized} instead!`);
    };
  
  
  function fetchCacheData(/** @type {IDBDatabase} */ db, fetch, data, onsuccess, onerror) {
    if (!db) {
      onerror(fetch, 0, 'IndexedDB not available!');
      return;
    }
  
    var fetch_attr = fetch + 112;
    var destinationPath = HEAPU32[(((fetch_attr)+(64))>>2)];
    destinationPath ||= HEAPU32[(((fetch)+(8))>>2)];
    var destinationPathStr = UTF8ToString(destinationPath);
  
    try {
      var transaction = db.transaction(['FILES'], 'readwrite');
      var packages = transaction.objectStore('FILES');
      var putRequest = packages.put(data, destinationPathStr);
      putRequest.onsuccess = (event) => {
        HEAP16[(((fetch)+(40))>>1)] = 4 // Mimic XHR readyState 4 === 'DONE: The operation is complete'
        HEAP16[(((fetch)+(42))>>1)] = 200 // Mimic XHR HTTP status code 200 "OK"
        stringToUTF8("OK", fetch + 44, 64);
        onsuccess(fetch, 0, destinationPathStr);
      };
      putRequest.onerror = (error) => {
        // Most likely we got an error if IndexedDB is unwilling to store any more data for this page.
        // TODO: Can we identify and break down different IndexedDB-provided errors and convert those
        // to more HTTP status codes for more information?
        HEAP16[(((fetch)+(40))>>1)] = 4 // Mimic XHR readyState 4 === 'DONE: The operation is complete'
        HEAP16[(((fetch)+(42))>>1)] = 413 // Mimic XHR HTTP status code 413 "Payload Too Large"
        stringToUTF8("Payload Too Large", fetch + 44, 64);
        onerror(fetch, 0, error);
      };
    } catch(e) {
      onerror(fetch, 0, e);
    }
  }
  
  function fetchLoadCachedData(db, fetch, onsuccess, onerror) {
    if (!db) {
      onerror(fetch, 0, 'IndexedDB not available!');
      return;
    }
  
    var fetch_attr = fetch + 112;
    var path = HEAPU32[(((fetch_attr)+(64))>>2)];
    path ||= HEAPU32[(((fetch)+(8))>>2)];
    var pathStr = UTF8ToString(path);
  
    try {
      var transaction = db.transaction(['FILES'], 'readonly');
      var packages = transaction.objectStore('FILES');
      var getRequest = packages.get(pathStr);
      getRequest.onsuccess = (event) => {
        if (event.target.result) {
          var value = event.target.result;
          var len = value.byteLength || value.length;
          // The data pointer malloc()ed here has the same lifetime as the emscripten_fetch_t structure itself has, and is
          // freed when emscripten_fetch_close() is called.
          var ptr = _malloc(len);
          HEAPU8.set(new Uint8Array(value), ptr);
          HEAPU32[(((fetch)+(12))>>2)] = ptr;
          writeI53ToI64(fetch + 16, len);
          writeI53ToI64(fetch + 24, 0);
          writeI53ToI64(fetch + 32, len);
          HEAP16[(((fetch)+(40))>>1)] = 4 // Mimic XHR readyState 4 === 'DONE: The operation is complete'
          HEAP16[(((fetch)+(42))>>1)] = 200 // Mimic XHR HTTP status code 200 "OK"
          stringToUTF8("OK", fetch + 44, 64);
          onsuccess(fetch, 0, value);
        } else {
          // Succeeded to load, but the load came back with the value of undefined, treat that as an error since we never store undefined in db.
          HEAP16[(((fetch)+(40))>>1)] = 4 // Mimic XHR readyState 4 === 'DONE: The operation is complete'
          HEAP16[(((fetch)+(42))>>1)] = 404 // Mimic XHR HTTP status code 404 "Not Found"
          stringToUTF8("Not Found", fetch + 44, 64);
          onerror(fetch, 0, 'no data');
        }
      };
      getRequest.onerror = (error) => {
        HEAP16[(((fetch)+(40))>>1)] = 4 // Mimic XHR readyState 4 === 'DONE: The operation is complete'
        HEAP16[(((fetch)+(42))>>1)] = 404 // Mimic XHR HTTP status code 404 "Not Found"
        stringToUTF8("Not Found", fetch + 44, 64);
        onerror(fetch, 0, error);
      };
    } catch(e) {
      onerror(fetch, 0, e);
    }
  }
  
  function fetchDeleteCachedData(db, fetch, onsuccess, onerror) {
    if (!db) {
      onerror(fetch, 0, 'IndexedDB not available!');
      return;
    }
  
    var fetch_attr = fetch + 112;
    var path = HEAPU32[(((fetch_attr)+(64))>>2)];
    path ||= HEAPU32[(((fetch)+(8))>>2)];
  
    var pathStr = UTF8ToString(path);
  
    try {
      var transaction = db.transaction(['FILES'], 'readwrite');
      var packages = transaction.objectStore('FILES');
      var request = packages.delete(pathStr);
      request.onsuccess = (event) => {
        var value = event.target.result;
        HEAPU32[(((fetch)+(12))>>2)] = 0;
        writeI53ToI64(fetch + 16, 0);
        writeI53ToI64(fetch + 24, 0);
        writeI53ToI64(fetch + 32, 0);
        // Mimic XHR readyState 4 === 'DONE: The operation is complete'
        HEAP16[(((fetch)+(40))>>1)] = 4;
        // Mimic XHR HTTP status code 200 "OK"
        HEAP16[(((fetch)+(42))>>1)] = 200;
        stringToUTF8("OK", fetch + 44, 64);
        onsuccess(fetch, 0, value);
      };
      request.onerror = (error) => {
        HEAP16[(((fetch)+(40))>>1)] = 4 // Mimic XHR readyState 4 === 'DONE: The operation is complete'
        HEAP16[(((fetch)+(42))>>1)] = 404 // Mimic XHR HTTP status code 404 "Not Found"
        stringToUTF8("Not Found", fetch + 44, 64);
        onerror(fetch, 0, error);
      };
    } catch(e) {
      onerror(fetch, 0, e);
    }
  }
  
  function _emscripten_start_fetch(fetch, successcb, errorcb, progresscb, readystatechangecb) {
    // Avoid shutting down the runtime since we want to wait for the async
    // response.
    
  
    var fetch_attr = fetch + 112;
    var onsuccess = HEAPU32[(((fetch_attr)+(36))>>2)];
    var onerror = HEAPU32[(((fetch_attr)+(40))>>2)];
    var onprogress = HEAPU32[(((fetch_attr)+(44))>>2)];
    var onreadystatechange = HEAPU32[(((fetch_attr)+(48))>>2)];
    var fetchAttributes = HEAPU32[(((fetch_attr)+(52))>>2)];
    var fetchAttrSynchronous = !!(fetchAttributes & 64);
  
    function doCallback(f) {
      if (fetchAttrSynchronous) {
        f();
      } else {
        callUserCallback(f);
      }
    }
  
    var reportSuccess = (fetch, xhr, e) => {
      
      doCallback(() => {
        if (onsuccess) ((a1) => dynCall_vi(onsuccess, a1))(fetch);
        else successcb?.(fetch);
      });
    };
  
    var reportProgress = (fetch, xhr, e) => {
      doCallback(() => {
        if (onprogress) ((a1) => dynCall_vi(onprogress, a1))(fetch);
        else progresscb?.(fetch);
      });
    };
  
    var reportError = (fetch, xhr, e) => {
      
      doCallback(() => {
        if (onerror) ((a1) => dynCall_vi(onerror, a1))(fetch);
        else errorcb?.(fetch);
      });
    };
  
    var reportReadyStateChange = (fetch, xhr, e) => {
      doCallback(() => {
        if (onreadystatechange) ((a1) => dynCall_vi(onreadystatechange, a1))(fetch);
        else readystatechangecb?.(fetch);
      });
    };
  
    var performUncachedXhr = (fetch, xhr, e) => {
      fetchXHR(fetch, reportSuccess, reportError, reportProgress, reportReadyStateChange);
    };
  
    var cacheResultAndReportSuccess = (fetch, xhr, e) => {
      var storeSuccess = (fetch, xhr, e) => {
        
        doCallback(() => {
          if (onsuccess) ((a1) => dynCall_vi(onsuccess, a1))(fetch);
          else successcb?.(fetch);
        });
      };
      var storeError = (fetch, xhr, e) => {
        
        doCallback(() => {
          if (onsuccess) ((a1) => dynCall_vi(onsuccess, a1))(fetch);
          else successcb?.(fetch);
        });
      };
      fetchCacheData(Fetch.dbInstance, fetch, xhr.response, storeSuccess, storeError);
    };
  
    var performCachedXhr = (fetch, xhr, e) => {
      fetchXHR(fetch, cacheResultAndReportSuccess, reportError, reportProgress, reportReadyStateChange);
    };
  
    var requestMethod = UTF8ToString(fetch_attr + 0);
    var fetchAttrReplace = !!(fetchAttributes & 16);
    var fetchAttrPersistFile = !!(fetchAttributes & 4);
    var fetchAttrNoDownload = !!(fetchAttributes & 32);
    if (requestMethod === 'EM_IDB_STORE') {
      // TODO(?): Here we perform a clone of the data, because storing shared typed arrays to IndexedDB does not seem to be allowed.
      var ptr = HEAPU32[(((fetch_attr)+(84))>>2)];
      var size = HEAPU32[(((fetch_attr)+(88))>>2)];
      fetchCacheData(Fetch.dbInstance, fetch, HEAPU8.slice(ptr, ptr + size), reportSuccess, reportError);
    } else if (requestMethod === 'EM_IDB_DELETE') {
      fetchDeleteCachedData(Fetch.dbInstance, fetch, reportSuccess, reportError);
    } else if (!fetchAttrReplace) {
      fetchLoadCachedData(Fetch.dbInstance, fetch, reportSuccess, fetchAttrNoDownload ? reportError : (fetchAttrPersistFile ? performCachedXhr : performUncachedXhr));
    } else if (!fetchAttrNoDownload) {
      fetchXHR(fetch, fetchAttrPersistFile ? cacheResultAndReportSuccess : reportSuccess, reportError, reportProgress, reportReadyStateChange);
    } else {
      return 0; // todo: free
    }
    return fetch;
  }

  var webgl_enable_ANGLE_instanced_arrays = (ctx) => {
      // Extension available in WebGL 1 from Firefox 26 and Google Chrome 30 onwards. Core feature in WebGL 2.
      var ext = ctx.getExtension('ANGLE_instanced_arrays');
      if (ext) {
        ctx['vertexAttribDivisor'] = (index, divisor) => ext['vertexAttribDivisorANGLE'](index, divisor);
        ctx['drawArraysInstanced'] = (mode, first, count, primcount) => ext['drawArraysInstancedANGLE'](mode, first, count, primcount);
        ctx['drawElementsInstanced'] = (mode, count, type, indices, primcount) => ext['drawElementsInstancedANGLE'](mode, count, type, indices, primcount);
        return 1;
      }
    };
  
  var webgl_enable_OES_vertex_array_object = (ctx) => {
      // Extension available in WebGL 1 from Firefox 25 and WebKit 536.28/desktop Safari 6.0.3 onwards. Core feature in WebGL 2.
      var ext = ctx.getExtension('OES_vertex_array_object');
      if (ext) {
        ctx['createVertexArray'] = () => ext['createVertexArrayOES']();
        ctx['deleteVertexArray'] = (vao) => ext['deleteVertexArrayOES'](vao);
        ctx['bindVertexArray'] = (vao) => ext['bindVertexArrayOES'](vao);
        ctx['isVertexArray'] = (vao) => ext['isVertexArrayOES'](vao);
        return 1;
      }
    };
  
  var webgl_enable_WEBGL_draw_buffers = (ctx) => {
      // Extension available in WebGL 1 from Firefox 28 onwards. Core feature in WebGL 2.
      var ext = ctx.getExtension('WEBGL_draw_buffers');
      if (ext) {
        ctx['drawBuffers'] = (n, bufs) => ext['drawBuffersWEBGL'](n, bufs);
        return 1;
      }
    };
  
  var webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance = (ctx) =>
      // Closure is expected to be allowed to minify the '.dibvbi' property, so not accessing it quoted.
      !!(ctx.dibvbi = ctx.getExtension('WEBGL_draw_instanced_base_vertex_base_instance'));
  
  var webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance = (ctx) => {
      // Closure is expected to be allowed to minify the '.mdibvbi' property, so not accessing it quoted.
      return !!(ctx.mdibvbi = ctx.getExtension('WEBGL_multi_draw_instanced_base_vertex_base_instance'));
    };
  
  var webgl_enable_WEBGL_multi_draw = (ctx) => {
      // Closure is expected to be allowed to minify the '.multiDrawWebgl' property, so not accessing it quoted.
      return !!(ctx.multiDrawWebgl = ctx.getExtension('WEBGL_multi_draw'));
    };
  
  var getEmscriptenSupportedExtensions = (ctx) => {
      // Restrict the list of advertised extensions to those that we actually
      // support.
      var supportedExtensions = [
        // WebGL 1 extensions
        'ANGLE_instanced_arrays',
        'EXT_blend_minmax',
        'EXT_disjoint_timer_query',
        'EXT_frag_depth',
        'EXT_shader_texture_lod',
        'EXT_sRGB',
        'OES_element_index_uint',
        'OES_fbo_render_mipmap',
        'OES_standard_derivatives',
        'OES_texture_float',
        'OES_texture_half_float',
        'OES_texture_half_float_linear',
        'OES_vertex_array_object',
        'WEBGL_color_buffer_float',
        'WEBGL_depth_texture',
        'WEBGL_draw_buffers',
        // WebGL 2 extensions
        'EXT_color_buffer_float',
        'EXT_conservative_depth',
        'EXT_disjoint_timer_query_webgl2',
        'EXT_texture_norm16',
        'NV_shader_noperspective_interpolation',
        'WEBGL_clip_cull_distance',
        // WebGL 1 and WebGL 2 extensions
        'EXT_color_buffer_half_float',
        'EXT_depth_clamp',
        'EXT_float_blend',
        'EXT_texture_compression_bptc',
        'EXT_texture_compression_rgtc',
        'EXT_texture_filter_anisotropic',
        'KHR_parallel_shader_compile',
        'OES_texture_float_linear',
        'WEBGL_blend_func_extended',
        'WEBGL_compressed_texture_astc',
        'WEBGL_compressed_texture_etc',
        'WEBGL_compressed_texture_etc1',
        'WEBGL_compressed_texture_s3tc',
        'WEBGL_compressed_texture_s3tc_srgb',
        'WEBGL_debug_renderer_info',
        'WEBGL_debug_shaders',
        'WEBGL_lose_context',
        'WEBGL_multi_draw',
      ];
      // .getSupportedExtensions() can return null if context is lost, so coerce to empty array.
      return (ctx.getSupportedExtensions() || []).filter(ext => supportedExtensions.includes(ext));
    };
  
  
  var GL = {
  counter:1,
  buffers:[],
  mappedBuffers:{
  },
  programs:[],
  framebuffers:[],
  renderbuffers:[],
  textures:[],
  shaders:[],
  vaos:[],
  contexts:[],
  offscreenCanvases:{
  },
  queries:[],
  samplers:[],
  transformFeedbacks:[],
  syncs:[],
  byteSizeByTypeRoot:5120,
  byteSizeByType:[1,1,2,2,4,4,4,2,3,4,8],
  stringCache:{
  },
  stringiCache:{
  },
  unpackAlignment:4,
  recordError:(errorCode) => {
        if (!GL.lastError) {
          GL.lastError = errorCode;
        }
      },
  getNewId:(table) => {
        var ret = GL.counter++;
        for (var i = table.length; i < ret; i++) {
          table[i] = null;
        }
        return ret;
      },
  genObject:(n, buffers, createFunction, objectTable
        ) => {
        for (var i = 0; i < n; i++) {
          var buffer = GLctx[createFunction]();
          var id = buffer && GL.getNewId(objectTable);
          if (buffer) {
            buffer.name = id;
            objectTable[id] = buffer;
          } else {
            GL.recordError(0x502 /* GL_INVALID_OPERATION */);
          }
          HEAP32[(((buffers)+(i*4))>>2)] = id;
        }
      },
  MAX_TEMP_BUFFER_SIZE:2097152,
  numTempVertexBuffersPerSize:64,
  log2ceilLookup:(i) => 32 - Math.clz32(i === 0 ? 0 : i - 1),
  generateTempBuffers:(quads, context) => {
        var largestIndex = GL.log2ceilLookup(GL.MAX_TEMP_BUFFER_SIZE);
        context.tempVertexBufferCounters1 = [];
        context.tempVertexBufferCounters2 = [];
        context.tempVertexBufferCounters1.length = context.tempVertexBufferCounters2.length = largestIndex+1;
        context.tempVertexBuffers1 = [];
        context.tempVertexBuffers2 = [];
        context.tempVertexBuffers1.length = context.tempVertexBuffers2.length = largestIndex+1;
        context.tempIndexBuffers = [];
        context.tempIndexBuffers.length = largestIndex+1;
        for (var i = 0; i <= largestIndex; ++i) {
          context.tempIndexBuffers[i] = null; // Created on-demand
          context.tempVertexBufferCounters1[i] = context.tempVertexBufferCounters2[i] = 0;
          var ringbufferLength = GL.numTempVertexBuffersPerSize;
          context.tempVertexBuffers1[i] = [];
          context.tempVertexBuffers2[i] = [];
          var ringbuffer1 = context.tempVertexBuffers1[i];
          var ringbuffer2 = context.tempVertexBuffers2[i];
          ringbuffer1.length = ringbuffer2.length = ringbufferLength;
          for (var j = 0; j < ringbufferLength; ++j) {
            ringbuffer1[j] = ringbuffer2[j] = null; // Created on-demand
          }
        }
  
        if (quads) {
          // GL_QUAD indexes can be precalculated
          context.tempQuadIndexBuffer = GLctx.createBuffer();
          context.GLctx.bindBuffer(0x8893 /*GL_ELEMENT_ARRAY_BUFFER*/, context.tempQuadIndexBuffer);
          var numIndexes = GL.MAX_TEMP_BUFFER_SIZE >> 1;
          var quadIndexes = new Uint16Array(numIndexes);
          var i = 0, v = 0;
          while (1) {
            quadIndexes[i++] = v;
            if (i >= numIndexes) break;
            quadIndexes[i++] = v+1;
            if (i >= numIndexes) break;
            quadIndexes[i++] = v+2;
            if (i >= numIndexes) break;
            quadIndexes[i++] = v;
            if (i >= numIndexes) break;
            quadIndexes[i++] = v+2;
            if (i >= numIndexes) break;
            quadIndexes[i++] = v+3;
            if (i >= numIndexes) break;
            v += 4;
          }
          context.GLctx.bufferData(0x8893 /*GL_ELEMENT_ARRAY_BUFFER*/, quadIndexes, 0x88E4 /*GL_STATIC_DRAW*/);
          context.GLctx.bindBuffer(0x8893 /*GL_ELEMENT_ARRAY_BUFFER*/, null);
        }
      },
  getTempVertexBuffer:(sizeBytes) => {
        var idx = GL.log2ceilLookup(sizeBytes);
        var ringbuffer = GL.currentContext.tempVertexBuffers1[idx];
        var nextFreeBufferIndex = GL.currentContext.tempVertexBufferCounters1[idx];
        GL.currentContext.tempVertexBufferCounters1[idx] = (GL.currentContext.tempVertexBufferCounters1[idx]+1) & (GL.numTempVertexBuffersPerSize-1);
        var vbo = ringbuffer[nextFreeBufferIndex];
        if (vbo) {
          return vbo;
        }
        var prevVBO = GLctx.getParameter(0x8894 /*GL_ARRAY_BUFFER_BINDING*/);
        ringbuffer[nextFreeBufferIndex] = GLctx.createBuffer();
        GLctx.bindBuffer(0x8892 /*GL_ARRAY_BUFFER*/, ringbuffer[nextFreeBufferIndex]);
        GLctx.bufferData(0x8892 /*GL_ARRAY_BUFFER*/, 1 << idx, 0x88E8 /*GL_DYNAMIC_DRAW*/);
        GLctx.bindBuffer(0x8892 /*GL_ARRAY_BUFFER*/, prevVBO);
        return ringbuffer[nextFreeBufferIndex];
      },
  getTempIndexBuffer:(sizeBytes) => {
        var idx = GL.log2ceilLookup(sizeBytes);
        var ibo = GL.currentContext.tempIndexBuffers[idx];
        if (ibo) {
          return ibo;
        }
        var prevIBO = GLctx.getParameter(0x8895 /*ELEMENT_ARRAY_BUFFER_BINDING*/);
        GL.currentContext.tempIndexBuffers[idx] = GLctx.createBuffer();
        GLctx.bindBuffer(0x8893 /*GL_ELEMENT_ARRAY_BUFFER*/, GL.currentContext.tempIndexBuffers[idx]);
        GLctx.bufferData(0x8893 /*GL_ELEMENT_ARRAY_BUFFER*/, 1 << idx, 0x88E8 /*GL_DYNAMIC_DRAW*/);
        GLctx.bindBuffer(0x8893 /*GL_ELEMENT_ARRAY_BUFFER*/, prevIBO);
        return GL.currentContext.tempIndexBuffers[idx];
      },
  newRenderingFrameStarted:() => {
        if (!GL.currentContext) {
          return;
        }
        var vb = GL.currentContext.tempVertexBuffers1;
        GL.currentContext.tempVertexBuffers1 = GL.currentContext.tempVertexBuffers2;
        GL.currentContext.tempVertexBuffers2 = vb;
        vb = GL.currentContext.tempVertexBufferCounters1;
        GL.currentContext.tempVertexBufferCounters1 = GL.currentContext.tempVertexBufferCounters2;
        GL.currentContext.tempVertexBufferCounters2 = vb;
        var largestIndex = GL.log2ceilLookup(GL.MAX_TEMP_BUFFER_SIZE);
        for (var i = 0; i <= largestIndex; ++i) {
          GL.currentContext.tempVertexBufferCounters1[i] = 0;
        }
      },
  getSource:(shader, count, string, length) => {
        var source = '';
        for (var i = 0; i < count; ++i) {
          var len = length ? HEAPU32[(((length)+(i*4))>>2)] : undefined;
          source += UTF8ToString(HEAPU32[(((string)+(i*4))>>2)], len);
        }
        return source;
      },
  calcBufLength:(size, type, stride, count) => {
        if (stride > 0) {
          return count * stride;  // XXXvlad this is not exactly correct I don't think
        }
        var typeSize = GL.byteSizeByType[type - GL.byteSizeByTypeRoot];
        return size * typeSize * count;
      },
  usedTempBuffers:[],
  preDrawHandleClientVertexAttribBindings:(count) => {
        GL.resetBufferBinding = false;
  
        // TODO: initial pass to detect ranges we need to upload, might not need
        // an upload per attrib
        for (var i = 0; i < GL.currentContext.maxVertexAttribs; ++i) {
          var cb = GL.currentContext.clientBuffers[i];
          if (!cb.clientside || !cb.enabled) continue;
  
          GL.resetBufferBinding = true;
  
          var size = GL.calcBufLength(cb.size, cb.type, cb.stride, count);
          var buf = GL.getTempVertexBuffer(size);
          GLctx.bindBuffer(0x8892 /*GL_ARRAY_BUFFER*/, buf);
          GLctx.bufferSubData(0x8892 /*GL_ARRAY_BUFFER*/,
                                   0,
                                   HEAPU8.subarray(cb.ptr, cb.ptr + size));
          cb.vertexAttribPointerAdaptor.call(GLctx, i, cb.size, cb.type, cb.normalized, cb.stride, 0);
        }
      },
  postDrawHandleClientVertexAttribBindings:() => {
        if (GL.resetBufferBinding) {
          GLctx.bindBuffer(0x8892 /*GL_ARRAY_BUFFER*/, GL.buffers[GLctx.currentArrayBufferBinding]);
        }
      },
  createContext:(/** @type {HTMLCanvasElement} */ canvas, webGLContextAttributes) => {
  
        // BUG: Workaround Safari WebGL issue: After successfully acquiring WebGL
        // context on a canvas, calling .getContext() will always return that
        // context independent of which 'webgl' or 'webgl2'
        // context version was passed. See:
        //   https://bugs.webkit.org/show_bug.cgi?id=222758
        // and:
        //   https://github.com/emscripten-core/emscripten/issues/13295.
        // TODO: Once the bug is fixed and shipped in Safari, adjust the Safari
        // version field in above check.
        if (!canvas.getContextSafariWebGL2Fixed) {
          canvas.getContextSafariWebGL2Fixed = canvas.getContext;
          /** @type {function(this:HTMLCanvasElement, string, (Object|null)=): (Object|null)} */
          function fixedGetContext(ver, attrs) {
            var gl = canvas.getContextSafariWebGL2Fixed(ver, attrs);
            return ((ver == 'webgl') == (gl instanceof WebGLRenderingContext)) ? gl : null;
          }
          canvas.getContext = fixedGetContext;
        }
  
        var ctx =
          (webGLContextAttributes.majorVersion > 1)
          ?
            canvas.getContext("webgl2", webGLContextAttributes)
          :
          (canvas.getContext("webgl", webGLContextAttributes)
            // https://caniuse.com/#feat=webgl
            );
  
        if (!ctx) return 0;
  
        var handle = GL.registerContext(ctx, webGLContextAttributes);
  
        return handle;
      },
  registerContext:(ctx, webGLContextAttributes) => {
        // without pthreads a context is just an integer ID
        var handle = GL.getNewId(GL.contexts);
  
        var context = {
          handle,
          attributes: webGLContextAttributes,
          version: webGLContextAttributes.majorVersion,
          GLctx: ctx
        };
  
        // Store the created context object so that we can access the context
        // given a canvas without having to pass the parameters again.
        if (ctx.canvas) ctx.canvas.GLctxObject = context;
        GL.contexts[handle] = context;
        if (typeof webGLContextAttributes.enableExtensionsByDefault == 'undefined' || webGLContextAttributes.enableExtensionsByDefault) {
          GL.initExtensions(context);
        }
  
        context.maxVertexAttribs = context.GLctx.getParameter(0x8869 /*GL_MAX_VERTEX_ATTRIBS*/);
        context.clientBuffers = [];
        for (var i = 0; i < context.maxVertexAttribs; i++) {
          context.clientBuffers[i] = {
            enabled: false,
            clientside: false,
            size: 0,
            type: 0,
            normalized: 0,
            stride: 0,
            ptr: 0,
            vertexAttribPointerAdaptor: null,
          };
        }
  
        GL.generateTempBuffers(false, context);
  
        return handle;
      },
  makeContextCurrent:(contextHandle) => {
  
        // Active Emscripten GL layer context object.
        GL.currentContext = GL.contexts[contextHandle];
        // Active WebGL context object.
        Module.ctx = GLctx = GL.currentContext?.GLctx;
        return !(contextHandle && !GLctx);
      },
  getContext:(contextHandle) => {
        return GL.contexts[contextHandle];
      },
  deleteContext:(contextHandle) => {
        if (GL.currentContext === GL.contexts[contextHandle]) {
          GL.currentContext = null;
        }
        if (typeof JSEvents == 'object') {
          // Release all JS event handlers on the DOM element that the GL context is
          // associated with since the context is now deleted.
          JSEvents.removeAllHandlersOnTarget(GL.contexts[contextHandle].GLctx.canvas);
        }
        // Make sure the canvas object no longer refers to the context object so
        // there are no GC surprises.
        if (GL.contexts[contextHandle] && GL.contexts[contextHandle].GLctx.canvas) {
          GL.contexts[contextHandle].GLctx.canvas.GLctxObject = undefined;
        }
        GL.contexts[contextHandle] = null;
      },
  initExtensions:(context) => {
        // If this function is called without a specific context object, init the
        // extensions of the currently active context.
        context ||= GL.currentContext;
  
        if (context.initExtensionsDone) return;
        context.initExtensionsDone = true;
  
        var GLctx = context.GLctx;
  
        // Detect the presence of a few extensions manually, ction GL interop
        // layer itself will need to know if they exist.
  
        // Extensions that are only available in WebGL 1 (the calls will be no-ops
        // if called on a WebGL 2 context active)
        webgl_enable_ANGLE_instanced_arrays(GLctx);
        webgl_enable_OES_vertex_array_object(GLctx);
        webgl_enable_WEBGL_draw_buffers(GLctx);
        // Extensions that are available from WebGL >= 2 (no-op if called on a WebGL 1 context active)
        webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance(GLctx);
        webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance(GLctx);
  
        // On WebGL 2, EXT_disjoint_timer_query is replaced with an alternative
        // that's based on core APIs, and exposes only the queryCounterEXT()
        // entrypoint.
        if (context.version >= 2) {
          GLctx.disjointTimerQueryExt = GLctx.getExtension("EXT_disjoint_timer_query_webgl2");
        }
  
        // However, Firefox exposes the WebGL 1 version on WebGL 2 as well and
        // thus we look for the WebGL 1 version again if the WebGL 2 version
        // isn't present. https://bugzilla.mozilla.org/show_bug.cgi?id=1328882
        if (context.version < 2 || !GLctx.disjointTimerQueryExt)
        {
          GLctx.disjointTimerQueryExt = GLctx.getExtension("EXT_disjoint_timer_query");
        }
  
        webgl_enable_WEBGL_multi_draw(GLctx);
  
        getEmscriptenSupportedExtensions(GLctx).forEach((ext) => {
          // WEBGL_lose_context, WEBGL_debug_renderer_info and WEBGL_debug_shaders
          // are not enabled by default.
          if (!ext.includes('lose_context') && !ext.includes('debug')) {
            // Call .getExtension() to enable that extension permanently.
            GLctx.getExtension(ext);
          }
        });
      },
  };
  
  
  var webglPowerPreferences = ["default","low-power","high-performance"];
  
  
  var findCanvasEventTarget = findEventTarget;
  
  /** @suppress {duplicate } */
  var _emscripten_webgl_do_create_context = (target, attributes) => {
      assert(attributes);
      var a = ((attributes)>>2);
      var powerPreference = HEAP32[a + (24>>2)];
      var contextAttributes = {
        'alpha': !!HEAP32[a + (0>>2)],
        'depth': !!HEAP32[a + (4>>2)],
        'stencil': !!HEAP32[a + (8>>2)],
        'antialias': !!HEAP32[a + (12>>2)],
        'premultipliedAlpha': !!HEAP32[a + (16>>2)],
        'preserveDrawingBuffer': !!HEAP32[a + (20>>2)],
        'powerPreference': webglPowerPreferences[powerPreference],
        'failIfMajorPerformanceCaveat': !!HEAP32[a + (28>>2)],
        // The following are not predefined WebGL context attributes in the WebGL specification, so the property names can be minified by Closure.
        majorVersion: HEAP32[a + (32>>2)],
        minorVersion: HEAP32[a + (36>>2)],
        enableExtensionsByDefault: HEAP32[a + (40>>2)],
        explicitSwapControl: HEAP32[a + (44>>2)],
        proxyContextToMainThread: HEAP32[a + (48>>2)],
        renderViaOffscreenBackBuffer: HEAP32[a + (52>>2)]
      };
  
      var canvas = findCanvasEventTarget(target);
  
      if (!canvas) {
        return 0;
      }
  
      if (contextAttributes.explicitSwapControl) {
        return 0;
      }
  
      var contextHandle = GL.createContext(canvas, contextAttributes);
      return contextHandle;
    };
  var _emscripten_webgl_create_context = _emscripten_webgl_do_create_context;

  var _emscripten_webgl_make_context_current = (contextHandle) => {
      var success = GL.makeContextCurrent(contextHandle);
      return success ? 0 : -5;
    };

  var ENV = {
  };
  
  var getExecutableName = () => {
      return thisProgram || './this.program';
    };
  var getEnvStrings = () => {
      if (!getEnvStrings.strings) {
        // Default values.
        // Browser language detection #8751
        var lang = ((typeof navigator == 'object' && navigator.languages && navigator.languages[0]) || 'C').replace('-', '_') + '.UTF-8';
        var env = {
          'USER': 'web_user',
          'LOGNAME': 'web_user',
          'PATH': '/',
          'PWD': '/',
          'HOME': '/home/web_user',
          'LANG': lang,
          '_': getExecutableName()
        };
        // Apply the user-provided values, if any.
        for (var x in ENV) {
          // x is a key in ENV; if ENV[x] is undefined, that means it was
          // explicitly set to be so. We allow user code to do that to
          // force variables with default values to remain unset.
          if (ENV[x] === undefined) delete env[x];
          else env[x] = ENV[x];
        }
        var strings = [];
        for (var x in env) {
          strings.push(`${x}=${env[x]}`);
        }
        getEnvStrings.strings = strings;
      }
      return getEnvStrings.strings;
    };
  
  var stringToAscii = (str, buffer) => {
      for (var i = 0; i < str.length; ++i) {
        assert(str.charCodeAt(i) === (str.charCodeAt(i) & 0xff));
        HEAP8[buffer++] = str.charCodeAt(i);
      }
      // Null-terminate the string
      HEAP8[buffer] = 0;
    };
  var _environ_get = (__environ, environ_buf) => {
      var bufSize = 0;
      getEnvStrings().forEach((string, i) => {
        var ptr = environ_buf + bufSize;
        HEAPU32[(((__environ)+(i*4))>>2)] = ptr;
        stringToAscii(string, ptr);
        bufSize += string.length + 1;
      });
      return 0;
    };

  var _environ_sizes_get = (penviron_count, penviron_buf_size) => {
      var strings = getEnvStrings();
      HEAPU32[((penviron_count)>>2)] = strings.length;
      var bufSize = 0;
      strings.forEach((string) => bufSize += string.length + 1);
      HEAPU32[((penviron_buf_size)>>2)] = bufSize;
      return 0;
    };


  function _fd_close(fd) {
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      FS.close(stream);
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return e.errno;
  }
  }

  /** @param {number=} offset */
  var doReadv = (stream, iov, iovcnt, offset) => {
      var ret = 0;
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAPU32[((iov)>>2)];
        var len = HEAPU32[(((iov)+(4))>>2)];
        iov += 8;
        var curr = FS.read(stream, HEAP8, ptr, len, offset);
        if (curr < 0) return -1;
        ret += curr;
        if (curr < len) break; // nothing more to read
        if (typeof offset !== 'undefined') {
          offset += curr;
        }
      }
      return ret;
    };
  
  function _fd_read(fd, iov, iovcnt, pnum) {
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      var num = doReadv(stream, iov, iovcnt);
      HEAPU32[((pnum)>>2)] = num;
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return e.errno;
  }
  }

  
  function _fd_seek(fd,offset_low, offset_high,whence,newOffset) {
    var offset = convertI32PairToI53Checked(offset_low, offset_high);;
  
    
  try {
  
      if (isNaN(offset)) return 61;
      var stream = SYSCALLS.getStreamFromFD(fd);
      FS.llseek(stream, offset, whence);
      (tempI64 = [stream.position>>>0,(tempDouble = stream.position,(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? (+(Math.floor((tempDouble)/4294967296.0)))>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)], HEAP32[((newOffset)>>2)] = tempI64[0],HEAP32[(((newOffset)+(4))>>2)] = tempI64[1]);
      if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null; // reset readdir state
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return e.errno;
  }
  ;
  }

  /** @param {number=} offset */
  var doWritev = (stream, iov, iovcnt, offset) => {
      var ret = 0;
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAPU32[((iov)>>2)];
        var len = HEAPU32[(((iov)+(4))>>2)];
        iov += 8;
        var curr = FS.write(stream, HEAP8, ptr, len, offset);
        if (curr < 0) return -1;
        ret += curr;
        if (typeof offset !== 'undefined') {
          offset += curr;
        }
      }
      return ret;
    };
  
  function _fd_write(fd, iov, iovcnt, pnum) {
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      var num = doWritev(stream, iov, iovcnt);
      HEAPU32[((pnum)>>2)] = num;
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return e.errno;
  }
  }

  var _glActiveTexture = (x0) => GLctx.activeTexture(x0);

  var _glAttachShader = (program, shader) => {
      GLctx.attachShader(GL.programs[program], GL.shaders[shader]);
    };

  var _glBindBuffer = (target, buffer) => {
      if (target == 0x8892 /*GL_ARRAY_BUFFER*/) {
        GLctx.currentArrayBufferBinding = buffer;
      } else if (target == 0x8893 /*GL_ELEMENT_ARRAY_BUFFER*/) {
        GLctx.currentElementArrayBufferBinding = buffer;
      }
  
      if (target == 0x88EB /*GL_PIXEL_PACK_BUFFER*/) {
        // In WebGL 2 glReadPixels entry point, we need to use a different WebGL 2
        // API function call when a buffer is bound to
        // GL_PIXEL_PACK_BUFFER_BINDING point, so must keep track whether that
        // binding point is non-null to know what is the proper API function to
        // call.
        GLctx.currentPixelPackBufferBinding = buffer;
      } else if (target == 0x88EC /*GL_PIXEL_UNPACK_BUFFER*/) {
        // In WebGL 2 gl(Compressed)Tex(Sub)Image[23]D entry points, we need to
        // use a different WebGL 2 API function call when a buffer is bound to
        // GL_PIXEL_UNPACK_BUFFER_BINDING point, so must keep track whether that
        // binding point is non-null to know what is the proper API function to
        // call.
        GLctx.currentPixelUnpackBufferBinding = buffer;
      }
      GLctx.bindBuffer(target, GL.buffers[buffer]);
    };

  var _glBindFramebuffer = (target, framebuffer) => {
  
      GLctx.bindFramebuffer(target, GL.framebuffers[framebuffer]);
  
    };

  var _glBindTexture = (target, texture) => {
      GLctx.bindTexture(target, GL.textures[texture]);
    };

  var _glBindVertexArray = (vao) => {
      GLctx.bindVertexArray(GL.vaos[vao]);
      var ibo = GLctx.getParameter(0x8895 /*ELEMENT_ARRAY_BUFFER_BINDING*/);
      GLctx.currentElementArrayBufferBinding = ibo ? (ibo.name | 0) : 0;
    };

  var _glBlendFunc = (x0, x1) => GLctx.blendFunc(x0, x1);

  var _glBufferData = (target, size, data, usage) => {
  
      if (GL.currentContext.version >= 2) {
        // WebGL 2 provides new garbage-free entry points to call to WebGL. Use
        // those always when possible.  If size is zero, WebGL would interpret
        // uploading the whole input arraybuffer (starting from given offset),
        // which would not make sense in WebAssembly, so avoid uploading if size
        // is zero. However we must still call bufferData to establish a backing
        // storage of zero bytes.
        if (data && size) {
          GLctx.bufferData(target, HEAPU8, usage, data, size);
        } else {
          GLctx.bufferData(target, size, usage);
        }
      } else {
        // N.b. here first form specifies a heap subarray, second form an integer
        // size, so the ?: code here is polymorphic. It is advised to avoid
        // randomly mixing both uses in calling code, to avoid any potential JS
        // engine JIT issues.
        GLctx.bufferData(target, data ? HEAPU8.subarray(data, data+size) : size, usage);
      }
    };

  var _glCheckFramebufferStatus = (x0) => GLctx.checkFramebufferStatus(x0);

  var _glClear = (x0) => GLctx.clear(x0);

  var _glClearColor = (x0, x1, x2, x3) => GLctx.clearColor(x0, x1, x2, x3);

  var _glCompileShader = (shader) => {
      GLctx.compileShader(GL.shaders[shader]);
    };

  var _glCreateProgram = () => {
      var id = GL.getNewId(GL.programs);
      var program = GLctx.createProgram();
      // Store additional information needed for each shader program:
      program.name = id;
      // Lazy cache results of
      // glGetProgramiv(GL_ACTIVE_UNIFORM_MAX_LENGTH/GL_ACTIVE_ATTRIBUTE_MAX_LENGTH/GL_ACTIVE_UNIFORM_BLOCK_MAX_NAME_LENGTH)
      program.maxUniformLength = program.maxAttributeLength = program.maxUniformBlockNameLength = 0;
      program.uniformIdCounter = 1;
      GL.programs[id] = program;
      return id;
    };

  var _glCreateShader = (shaderType) => {
      var id = GL.getNewId(GL.shaders);
      GL.shaders[id] = GLctx.createShader(shaderType);
  
      return id;
    };

  var _glDeleteTextures = (n, textures) => {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(((textures)+(i*4))>>2)];
        var texture = GL.textures[id];
        // GL spec: "glDeleteTextures silently ignores 0s and names that do not
        // correspond to existing textures".
        if (!texture) continue;
        GLctx.deleteTexture(texture);
        texture.name = 0;
        GL.textures[id] = null;
      }
    };

  var _glDisable = (x0) => GLctx.disable(x0);

  var _glDrawArrays = (mode, first, count) => {
      // bind any client-side buffers
      GL.preDrawHandleClientVertexAttribBindings(first + count);
  
      GLctx.drawArrays(mode, first, count);
  
      GL.postDrawHandleClientVertexAttribBindings();
    };

  var _glDrawArraysInstanced = (mode, first, count, primcount) => {
      GLctx.drawArraysInstanced(mode, first, count, primcount);
    };

  var _glDrawElements = (mode, count, type, indices) => {
      var buf;
      if (!GLctx.currentElementArrayBufferBinding) {
        var size = GL.calcBufLength(1, type, 0, count);
        buf = GL.getTempIndexBuffer(size);
        GLctx.bindBuffer(0x8893 /*GL_ELEMENT_ARRAY_BUFFER*/, buf);
        GLctx.bufferSubData(0x8893 /*GL_ELEMENT_ARRAY_BUFFER*/,
                                 0,
                                 HEAPU8.subarray(indices, indices + size));
        // the index is now 0
        indices = 0;
      }
  
      // bind any client-side buffers
      GL.preDrawHandleClientVertexAttribBindings(count);
  
      GLctx.drawElements(mode, count, type, indices);
  
      GL.postDrawHandleClientVertexAttribBindings(count);
  
      if (!GLctx.currentElementArrayBufferBinding) {
        GLctx.bindBuffer(0x8893 /*GL_ELEMENT_ARRAY_BUFFER*/, null);
      }
    };

  var _glEnable = (x0) => GLctx.enable(x0);

  var _glEnableVertexAttribArray = (index) => {
      var cb = GL.currentContext.clientBuffers[index];
      cb.enabled = true;
      GLctx.enableVertexAttribArray(index);
    };

  var _glFramebufferTexture2D = (target, attachment, textarget, texture, level) => {
      GLctx.framebufferTexture2D(target, attachment, textarget,
                                      GL.textures[texture], level);
    };

  var _glGenBuffers = (n, buffers) => {
      GL.genObject(n, buffers, 'createBuffer', GL.buffers
        );
    };

  var _glGenFramebuffers = (n, ids) => {
      GL.genObject(n, ids, 'createFramebuffer', GL.framebuffers
        );
    };

  var _glGenTextures = (n, textures) => {
      GL.genObject(n, textures, 'createTexture', GL.textures
        );
    };

  var _glGenVertexArrays = (n, arrays) => {
      GL.genObject(n, arrays, 'createVertexArray', GL.vaos
        );
    };

  var _glGenerateMipmap = (x0) => GLctx.generateMipmap(x0);

  
  var __glGetActiveAttribOrUniform = (funcName, program, index, bufSize, length, size, type, name) => {
      program = GL.programs[program];
      var info = GLctx[funcName](program, index);
      if (info) {
        // If an error occurs, nothing will be written to length, size and type and name.
        var numBytesWrittenExclNull = name && stringToUTF8(info.name, name, bufSize);
        if (length) HEAP32[((length)>>2)] = numBytesWrittenExclNull;
        if (size) HEAP32[((size)>>2)] = info.size;
        if (type) HEAP32[((type)>>2)] = info.type;
      }
    };
  
  var _glGetActiveAttrib = (program, index, bufSize, length, size, type, name) => {
      __glGetActiveAttribOrUniform('getActiveAttrib', program, index, bufSize, length, size, type, name);
    };

  
  var _glGetActiveUniform = (program, index, bufSize, length, size, type, name) => {
      __glGetActiveAttribOrUniform('getActiveUniform', program, index, bufSize, length, size, type, name);
    };

  
  var _glGetAttribLocation = (program, name) => {
      return GLctx.getAttribLocation(GL.programs[program], UTF8ToString(name));
    };

  
  
  var webglGetExtensions = function $webglGetExtensions() {
      var exts = getEmscriptenSupportedExtensions(GLctx);
      exts = exts.concat(exts.map((e) => "GL_" + e));
      return exts;
    };
  
  var emscriptenWebGLGet = (name_, p, type) => {
      // Guard against user passing a null pointer.
      // Note that GLES2 spec does not say anything about how passing a null
      // pointer should be treated.  Testing on desktop core GL 3, the application
      // crashes on glGetIntegerv to a null pointer, but better to report an error
      // instead of doing anything random.
      if (!p) {
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      var ret = undefined;
      switch (name_) { // Handle a few trivial GLES values
        case 0x8DFA: // GL_SHADER_COMPILER
          ret = 1;
          break;
        case 0x8DF8: // GL_SHADER_BINARY_FORMATS
          if (type != 0 && type != 1) {
            GL.recordError(0x500); // GL_INVALID_ENUM
          }
          // Do not write anything to the out pointer, since no binary formats are
          // supported.
          return;
        case 0x87FE: // GL_NUM_PROGRAM_BINARY_FORMATS
        case 0x8DF9: // GL_NUM_SHADER_BINARY_FORMATS
          ret = 0;
          break;
        case 0x86A2: // GL_NUM_COMPRESSED_TEXTURE_FORMATS
          // WebGL doesn't have GL_NUM_COMPRESSED_TEXTURE_FORMATS (it's obsolete
          // since GL_COMPRESSED_TEXTURE_FORMATS returns a JS array that can be
          // queried for length), so implement it ourselves to allow C++ GLES2
          // code get the length.
          var formats = GLctx.getParameter(0x86A3 /*GL_COMPRESSED_TEXTURE_FORMATS*/);
          ret = formats ? formats.length : 0;
          break;
  
        case 0x821D: // GL_NUM_EXTENSIONS
          if (GL.currentContext.version < 2) {
            // Calling GLES3/WebGL2 function with a GLES2/WebGL1 context
            GL.recordError(0x502 /* GL_INVALID_OPERATION */);
            return;
          }
          ret = webglGetExtensions().length;
          break;
        case 0x821B: // GL_MAJOR_VERSION
        case 0x821C: // GL_MINOR_VERSION
          if (GL.currentContext.version < 2) {
            GL.recordError(0x500); // GL_INVALID_ENUM
            return;
          }
          ret = name_ == 0x821B ? 3 : 0; // return version 3.0
          break;
      }
  
      if (ret === undefined) {
        var result = GLctx.getParameter(name_);
        switch (typeof result) {
          case "number":
            ret = result;
            break;
          case "boolean":
            ret = result ? 1 : 0;
            break;
          case "string":
            GL.recordError(0x500); // GL_INVALID_ENUM
            return;
          case "object":
            if (result === null) {
              // null is a valid result for some (e.g., which buffer is bound -
              // perhaps nothing is bound), but otherwise can mean an invalid
              // name_, which we need to report as an error
              switch (name_) {
                case 0x8894: // ARRAY_BUFFER_BINDING
                case 0x8B8D: // CURRENT_PROGRAM
                case 0x8895: // ELEMENT_ARRAY_BUFFER_BINDING
                case 0x8CA6: // FRAMEBUFFER_BINDING or DRAW_FRAMEBUFFER_BINDING
                case 0x8CA7: // RENDERBUFFER_BINDING
                case 0x8069: // TEXTURE_BINDING_2D
                case 0x85B5: // WebGL 2 GL_VERTEX_ARRAY_BINDING, or WebGL 1 extension OES_vertex_array_object GL_VERTEX_ARRAY_BINDING_OES
                case 0x8F36: // COPY_READ_BUFFER_BINDING or COPY_READ_BUFFER
                case 0x8F37: // COPY_WRITE_BUFFER_BINDING or COPY_WRITE_BUFFER
                case 0x88ED: // PIXEL_PACK_BUFFER_BINDING
                case 0x88EF: // PIXEL_UNPACK_BUFFER_BINDING
                case 0x8CAA: // READ_FRAMEBUFFER_BINDING
                case 0x8919: // SAMPLER_BINDING
                case 0x8C1D: // TEXTURE_BINDING_2D_ARRAY
                case 0x806A: // TEXTURE_BINDING_3D
                case 0x8E25: // TRANSFORM_FEEDBACK_BINDING
                case 0x8C8F: // TRANSFORM_FEEDBACK_BUFFER_BINDING
                case 0x8A28: // UNIFORM_BUFFER_BINDING
                case 0x8514: { // TEXTURE_BINDING_CUBE_MAP
                  ret = 0;
                  break;
                }
                default: {
                  GL.recordError(0x500); // GL_INVALID_ENUM
                  return;
                }
              }
            } else if (result instanceof Float32Array ||
                       result instanceof Uint32Array ||
                       result instanceof Int32Array ||
                       result instanceof Array) {
              for (var i = 0; i < result.length; ++i) {
                switch (type) {
                  case 0: HEAP32[(((p)+(i*4))>>2)] = result[i]; break;
                  case 2: HEAPF32[(((p)+(i*4))>>2)] = result[i]; break;
                  case 4: HEAP8[(p)+(i)] = result[i] ? 1 : 0; break;
                }
              }
              return;
            } else {
              try {
                ret = result.name | 0;
              } catch(e) {
                GL.recordError(0x500); // GL_INVALID_ENUM
                err(`GL_INVALID_ENUM in glGet${type}v: Unknown object returned from WebGL getParameter(${name_})! (error: ${e})`);
                return;
              }
            }
            break;
          default:
            GL.recordError(0x500); // GL_INVALID_ENUM
            err(`GL_INVALID_ENUM in glGet${type}v: Native code calling glGet${type}v(${name_}) and it returns ${result} of type ${typeof(result)}!`);
            return;
        }
      }
  
      switch (type) {
        case 1: writeI53ToI64(p, ret); break;
        case 0: HEAP32[((p)>>2)] = ret; break;
        case 2:   HEAPF32[((p)>>2)] = ret; break;
        case 4: HEAP8[p] = ret ? 1 : 0; break;
      }
    };
  
  var _glGetIntegerv = (name_, p) => emscriptenWebGLGet(name_, p, 0);

  var _glGetProgramInfoLog = (program, maxLength, length, infoLog) => {
      var log = GLctx.getProgramInfoLog(GL.programs[program]);
      if (log === null) log = '(unknown error)';
      var numBytesWrittenExclNull = (maxLength > 0 && infoLog) ? stringToUTF8(log, infoLog, maxLength) : 0;
      if (length) HEAP32[((length)>>2)] = numBytesWrittenExclNull;
    };

  var _glGetProgramiv = (program, pname, p) => {
      if (!p) {
        // GLES2 specification does not specify how to behave if p is a null
        // pointer. Since calling this function does not make sense if p == null,
        // issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
  
      if (program >= GL.counter) {
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
  
      program = GL.programs[program];
  
      if (pname == 0x8B84) { // GL_INFO_LOG_LENGTH
        var log = GLctx.getProgramInfoLog(program);
        if (log === null) log = '(unknown error)';
        HEAP32[((p)>>2)] = log.length + 1;
      } else if (pname == 0x8B87 /* GL_ACTIVE_UNIFORM_MAX_LENGTH */) {
        if (!program.maxUniformLength) {
          for (var i = 0; i < GLctx.getProgramParameter(program, 0x8B86/*GL_ACTIVE_UNIFORMS*/); ++i) {
            program.maxUniformLength = Math.max(program.maxUniformLength, GLctx.getActiveUniform(program, i).name.length+1);
          }
        }
        HEAP32[((p)>>2)] = program.maxUniformLength;
      } else if (pname == 0x8B8A /* GL_ACTIVE_ATTRIBUTE_MAX_LENGTH */) {
        if (!program.maxAttributeLength) {
          for (var i = 0; i < GLctx.getProgramParameter(program, 0x8B89/*GL_ACTIVE_ATTRIBUTES*/); ++i) {
            program.maxAttributeLength = Math.max(program.maxAttributeLength, GLctx.getActiveAttrib(program, i).name.length+1);
          }
        }
        HEAP32[((p)>>2)] = program.maxAttributeLength;
      } else if (pname == 0x8A35 /* GL_ACTIVE_UNIFORM_BLOCK_MAX_NAME_LENGTH */) {
        if (!program.maxUniformBlockNameLength) {
          for (var i = 0; i < GLctx.getProgramParameter(program, 0x8A36/*GL_ACTIVE_UNIFORM_BLOCKS*/); ++i) {
            program.maxUniformBlockNameLength = Math.max(program.maxUniformBlockNameLength, GLctx.getActiveUniformBlockName(program, i).length+1);
          }
        }
        HEAP32[((p)>>2)] = program.maxUniformBlockNameLength;
      } else {
        HEAP32[((p)>>2)] = GLctx.getProgramParameter(program, pname);
      }
    };

  
  var _glGetShaderInfoLog = (shader, maxLength, length, infoLog) => {
      var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
      if (log === null) log = '(unknown error)';
      var numBytesWrittenExclNull = (maxLength > 0 && infoLog) ? stringToUTF8(log, infoLog, maxLength) : 0;
      if (length) HEAP32[((length)>>2)] = numBytesWrittenExclNull;
    };

  var _glGetShaderiv = (shader, pname, p) => {
      if (!p) {
        // GLES2 specification does not specify how to behave if p is a null
        // pointer. Since calling this function does not make sense if p == null,
        // issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      if (pname == 0x8B84) { // GL_INFO_LOG_LENGTH
        var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
        if (log === null) log = '(unknown error)';
        // The GLES2 specification says that if the shader has an empty info log,
        // a value of 0 is returned. Otherwise the log has a null char appended.
        // (An empty string is falsey, so we can just check that instead of
        // looking at log.length.)
        var logLength = log ? log.length + 1 : 0;
        HEAP32[((p)>>2)] = logLength;
      } else if (pname == 0x8B88) { // GL_SHADER_SOURCE_LENGTH
        var source = GLctx.getShaderSource(GL.shaders[shader]);
        // source may be a null, or the empty string, both of which are falsey
        // values that we report a 0 length for.
        var sourceLength = source ? source.length + 1 : 0;
        HEAP32[((p)>>2)] = sourceLength;
      } else {
        HEAP32[((p)>>2)] = GLctx.getShaderParameter(GL.shaders[shader], pname);
      }
    };

  /** @suppress {checkTypes} */
  var jstoi_q = (str) => parseInt(str);
  
  /** @noinline */
  var webglGetLeftBracePos = (name) => name.slice(-1) == ']' && name.lastIndexOf('[');
  
  var webglPrepareUniformLocationsBeforeFirstUse = (program) => {
      var uniformLocsById = program.uniformLocsById, // Maps GLuint -> WebGLUniformLocation
        uniformSizeAndIdsByName = program.uniformSizeAndIdsByName, // Maps name -> [uniform array length, GLuint]
        i, j;
  
      // On the first time invocation of glGetUniformLocation on this shader program:
      // initialize cache data structures and discover which uniforms are arrays.
      if (!uniformLocsById) {
        // maps GLint integer locations to WebGLUniformLocations
        program.uniformLocsById = uniformLocsById = {};
        // maps integer locations back to uniform name strings, so that we can lazily fetch uniform array locations
        program.uniformArrayNamesById = {};
  
        for (i = 0; i < GLctx.getProgramParameter(program, 0x8B86/*GL_ACTIVE_UNIFORMS*/); ++i) {
          var u = GLctx.getActiveUniform(program, i);
          var nm = u.name;
          var sz = u.size;
          var lb = webglGetLeftBracePos(nm);
          var arrayName = lb > 0 ? nm.slice(0, lb) : nm;
  
          // Assign a new location.
          var id = program.uniformIdCounter;
          program.uniformIdCounter += sz;
          // Eagerly get the location of the uniformArray[0] base element.
          // The remaining indices >0 will be left for lazy evaluation to
          // improve performance. Those may never be needed to fetch, if the
          // application fills arrays always in full starting from the first
          // element of the array.
          uniformSizeAndIdsByName[arrayName] = [sz, id];
  
          // Store placeholder integers in place that highlight that these
          // >0 index locations are array indices pending population.
          for (j = 0; j < sz; ++j) {
            uniformLocsById[id] = j;
            program.uniformArrayNamesById[id++] = arrayName;
          }
        }
      }
    };
  
  
  
  var _glGetUniformLocation = (program, name) => {
  
      name = UTF8ToString(name);
  
      if (program = GL.programs[program]) {
        webglPrepareUniformLocationsBeforeFirstUse(program);
        var uniformLocsById = program.uniformLocsById; // Maps GLuint -> WebGLUniformLocation
        var arrayIndex = 0;
        var uniformBaseName = name;
  
        // Invariant: when populating integer IDs for uniform locations, we must
        // maintain the precondition that arrays reside in contiguous addresses,
        // i.e. for a 'vec4 colors[10];', colors[4] must be at location
        // colors[0]+4.  However, user might call glGetUniformLocation(program,
        // "colors") for an array, so we cannot discover based on the user input
        // arguments whether the uniform we are dealing with is an array. The only
        // way to discover which uniforms are arrays is to enumerate over all the
        // active uniforms in the program.
        var leftBrace = webglGetLeftBracePos(name);
  
        // If user passed an array accessor "[index]", parse the array index off the accessor.
        if (leftBrace > 0) {
          arrayIndex = jstoi_q(name.slice(leftBrace + 1)) >>> 0; // "index]", coerce parseInt(']') with >>>0 to treat "foo[]" as "foo[0]" and foo[-1] as unsigned out-of-bounds.
          uniformBaseName = name.slice(0, leftBrace);
        }
  
        // Have we cached the location of this uniform before?
        // A pair [array length, GLint of the uniform location]
        var sizeAndId = program.uniformSizeAndIdsByName[uniformBaseName];
  
        // If an uniform with this name exists, and if its index is within the
        // array limits (if it's even an array), query the WebGLlocation, or
        // return an existing cached location.
        if (sizeAndId && arrayIndex < sizeAndId[0]) {
          arrayIndex += sizeAndId[1]; // Add the base location of the uniform to the array index offset.
          if ((uniformLocsById[arrayIndex] = uniformLocsById[arrayIndex] || GLctx.getUniformLocation(program, name))) {
            return arrayIndex;
          }
        }
      }
      else {
        // N.b. we are currently unable to distinguish between GL program IDs that
        // never existed vs GL program IDs that have been deleted, so report
        // GL_INVALID_VALUE in both cases.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
      }
      return -1;
    };

  var _glLinkProgram = (program) => {
      program = GL.programs[program];
      GLctx.linkProgram(program);
      // Invalidate earlier computed uniform->ID mappings, those have now become stale
      program.uniformLocsById = 0; // Mark as null-like so that glGetUniformLocation() knows to populate this again.
      program.uniformSizeAndIdsByName = {};
  
    };

  var _glPixelStorei = (pname, param) => {
      if (pname == 0xCF5 /* GL_UNPACK_ALIGNMENT */) {
        GL.unpackAlignment = param;
      }
      GLctx.pixelStorei(pname, param);
    };

  var _glScissor = (x0, x1, x2, x3) => GLctx.scissor(x0, x1, x2, x3);

  var _glShaderSource = (shader, count, string, length) => {
      var source = GL.getSource(shader, count, string, length);
  
      GLctx.shaderSource(GL.shaders[shader], source);
    };

  var computeUnpackAlignedImageSize = (width, height, sizePerPixel, alignment) => {
      function roundedToNextMultipleOf(x, y) {
        return (x + y - 1) & -y;
      }
      var plainRowSize = width * sizePerPixel;
      var alignedRowSize = roundedToNextMultipleOf(plainRowSize, alignment);
      return height * alignedRowSize;
    };
  
  var colorChannelsInGlTextureFormat = (format) => {
      // Micro-optimizations for size: map format to size by subtracting smallest
      // enum value (0x1902) from all values first.  Also omit the most common
      // size value (1) from the list, which is assumed by formats not on the
      // list.
      var colorChannels = {
        // 0x1902 /* GL_DEPTH_COMPONENT */ - 0x1902: 1,
        // 0x1906 /* GL_ALPHA */ - 0x1902: 1,
        5: 3,
        6: 4,
        // 0x1909 /* GL_LUMINANCE */ - 0x1902: 1,
        8: 2,
        29502: 3,
        29504: 4,
        // 0x1903 /* GL_RED */ - 0x1902: 1,
        26917: 2,
        26918: 2,
        // 0x8D94 /* GL_RED_INTEGER */ - 0x1902: 1,
        29846: 3,
        29847: 4
      };
      return colorChannels[format - 0x1902]||1;
    };
  
  var heapObjectForWebGLType = (type) => {
      // Micro-optimization for size: Subtract lowest GL enum number (0x1400/* GL_BYTE */) from type to compare
      // smaller values for the heap, for shorter generated code size.
      // Also the type HEAPU16 is not tested for explicitly, but any unrecognized type will return out HEAPU16.
      // (since most types are HEAPU16)
      type -= 0x1400;
      if (type == 0) return HEAP8;
  
      if (type == 1) return HEAPU8;
  
      if (type == 2) return HEAP16;
  
      if (type == 4) return HEAP32;
  
      if (type == 6) return HEAPF32;
  
      if (type == 5
        || type == 28922
        || type == 28520
        || type == 30779
        || type == 30782
        )
        return HEAPU32;
  
      return HEAPU16;
    };
  
  var toTypedArrayIndex = (pointer, heap) =>
      pointer >>> (31 - Math.clz32(heap.BYTES_PER_ELEMENT));
  
  var emscriptenWebGLGetTexPixelData = (type, format, width, height, pixels, internalFormat) => {
      var heap = heapObjectForWebGLType(type);
      var sizePerPixel = colorChannelsInGlTextureFormat(format) * heap.BYTES_PER_ELEMENT;
      var bytes = computeUnpackAlignedImageSize(width, height, sizePerPixel, GL.unpackAlignment);
      return heap.subarray(toTypedArrayIndex(pixels, heap), toTypedArrayIndex(pixels + bytes, heap));
    };
  
  
  
  var _glTexImage2D = (target, level, internalFormat, width, height, border, format, type, pixels) => {
      if (GL.currentContext.version >= 2) {
        // WebGL 2 provides new garbage-free entry points to call to WebGL. Use
        // those always when possible.
        if (GLctx.currentPixelUnpackBufferBinding) {
          GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, pixels);
        } else if (pixels) {
          var heap = heapObjectForWebGLType(type);
          GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, heap, toTypedArrayIndex(pixels, heap));
        } else {
          GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, null);
        }
        return;
      }
      GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, pixels ? emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, internalFormat) : null);
    };

  var _glTexParameteri = (x0, x1, x2) => GLctx.texParameteri(x0, x1, x2);

  var _glTexStorage3D = (x0, x1, x2, x3, x4, x5) => GLctx.texStorage3D(x0, x1, x2, x3, x4, x5);

  
  
  
  var _glTexSubImage2D = (target, level, xoffset, yoffset, width, height, format, type, pixels) => {
      if (GL.currentContext.version >= 2) {
        // WebGL 2 provides new garbage-free entry points to call to WebGL. Use
        // those always when possible.
        if (GLctx.currentPixelUnpackBufferBinding) {
          GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixels);
        } else if (pixels) {
          var heap = heapObjectForWebGLType(type);
          GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, heap, toTypedArrayIndex(pixels, heap));
        } else {
          GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, null);
        }
        return;
      }
      var pixelData = null;
      if (pixels) pixelData = emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, 0);
      GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixelData);
    };

  
  var _glTexSubImage3D = (target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, pixels) => {
      if (GLctx.currentPixelUnpackBufferBinding) {
        GLctx.texSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, pixels);
      } else if (pixels) {
        var heap = heapObjectForWebGLType(type);
        GLctx.texSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, heap, toTypedArrayIndex(pixels, heap));
      } else {
        GLctx.texSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, null);
      }
    };

  var webglGetUniformLocation = (location) => {
      var p = GLctx.currentProgram;
  
      if (p) {
        var webglLoc = p.uniformLocsById[location];
        // p.uniformLocsById[location] stores either an integer, or a
        // WebGLUniformLocation.
        // If an integer, we have not yet bound the location, so do it now. The
        // integer value specifies the array index we should bind to.
        if (typeof webglLoc == 'number') {
          p.uniformLocsById[location] = webglLoc = GLctx.getUniformLocation(p, p.uniformArrayNamesById[location] + (webglLoc > 0 ? `[${webglLoc}]` : ''));
        }
        // Else an already cached WebGLUniformLocation, return it.
        return webglLoc;
      } else {
        GL.recordError(0x502/*GL_INVALID_OPERATION*/);
      }
    };
  
  var _glUniform1f = (location, v0) => {
      GLctx.uniform1f(webglGetUniformLocation(location), v0);
    };

  
  var _glUniform1i = (location, v0) => {
      GLctx.uniform1i(webglGetUniformLocation(location), v0);
    };

  
  var _glUniform2f = (location, v0, v1) => {
      GLctx.uniform2f(webglGetUniformLocation(location), v0, v1);
    };

  
  var _glUniform2i = (location, v0, v1) => {
      GLctx.uniform2i(webglGetUniformLocation(location), v0, v1);
    };

  
  var _glUniform3f = (location, v0, v1, v2) => {
      GLctx.uniform3f(webglGetUniformLocation(location), v0, v1, v2);
    };

  
  var _glUniform3i = (location, v0, v1, v2) => {
      GLctx.uniform3i(webglGetUniformLocation(location), v0, v1, v2);
    };

  
  var _glUniform4f = (location, v0, v1, v2, v3) => {
      GLctx.uniform4f(webglGetUniformLocation(location), v0, v1, v2, v3);
    };

  
  var _glUniform4i = (location, v0, v1, v2, v3) => {
      GLctx.uniform4i(webglGetUniformLocation(location), v0, v1, v2, v3);
    };

  
  var miniTempWebGLFloatBuffers = [];
  
  var _glUniformMatrix4fv = (location, count, transpose, value) => {
  
      // WebGL 2 provides new garbage-free entry points to call to WebGL. Use
      // those always when possible.
      if (GL.currentContext.version >= 2) {
        count && GLctx.uniformMatrix4fv(webglGetUniformLocation(location), !!transpose, HEAPF32, ((value)>>2), count*16);
        return;
      }
  
      if (count <= 18) {
        // avoid allocation when uploading few enough uniforms
        var view = miniTempWebGLFloatBuffers[16*count-1];
        // hoist the heap out of the loop for size and for pthreads+growth.
        var heap = HEAPF32;
        value = ((value)>>2);
        for (var i = 0; i < 16 * count; i += 16) {
          var dst = value + i;
          view[i] = heap[dst];
          view[i + 1] = heap[dst + 1];
          view[i + 2] = heap[dst + 2];
          view[i + 3] = heap[dst + 3];
          view[i + 4] = heap[dst + 4];
          view[i + 5] = heap[dst + 5];
          view[i + 6] = heap[dst + 6];
          view[i + 7] = heap[dst + 7];
          view[i + 8] = heap[dst + 8];
          view[i + 9] = heap[dst + 9];
          view[i + 10] = heap[dst + 10];
          view[i + 11] = heap[dst + 11];
          view[i + 12] = heap[dst + 12];
          view[i + 13] = heap[dst + 13];
          view[i + 14] = heap[dst + 14];
          view[i + 15] = heap[dst + 15];
        }
      } else
      {
        var view = HEAPF32.subarray((((value)>>2)), ((value+count*64)>>2));
      }
      GLctx.uniformMatrix4fv(webglGetUniformLocation(location), !!transpose, view);
    };

  var _glUseProgram = (program) => {
      program = GL.programs[program];
      GLctx.useProgram(program);
      // Record the currently active program so that we can access the uniform
      // mapping table of that program.
      GLctx.currentProgram = program;
    };

  var _glVertexAttribDivisor = (index, divisor) => {
      GLctx.vertexAttribDivisor(index, divisor);
    };

  var _glVertexAttribIPointer = (index, size, type, stride, ptr) => {
      var cb = GL.currentContext.clientBuffers[index];
      if (!GLctx.currentArrayBufferBinding) {
        cb.size = size;
        cb.type = type;
        cb.normalized = false;
        cb.stride = stride;
        cb.ptr = ptr;
        cb.clientside = true;
        cb.vertexAttribPointerAdaptor = function(index, size, type, normalized, stride, ptr) {
          this.vertexAttribIPointer(index, size, type, stride, ptr);
        };
        return;
      }
      cb.clientside = false;
      GLctx.vertexAttribIPointer(index, size, type, stride, ptr);
    };

  var _glVertexAttribPointer = (index, size, type, normalized, stride, ptr) => {
      var cb = GL.currentContext.clientBuffers[index];
      if (!GLctx.currentArrayBufferBinding) {
        cb.size = size;
        cb.type = type;
        cb.normalized = normalized;
        cb.stride = stride;
        cb.ptr = ptr;
        cb.clientside = true;
        cb.vertexAttribPointerAdaptor = function(index, size, type, normalized, stride, ptr) {
          this.vertexAttribPointer(index, size, type, normalized, stride, ptr);
        };
        return;
      }
      cb.clientside = false;
      GLctx.vertexAttribPointer(index, size, type, !!normalized, stride, ptr);
    };

  var _glViewport = (x0, x1, x2, x3) => GLctx.viewport(x0, x1, x2, x3);



  
  var stringToUTF8OnStack = (str) => {
      var size = lengthBytesUTF8(str) + 1;
      var ret = stackAlloc(size);
      stringToUTF8(str, ret, size);
      return ret;
    };


  var runAndAbortIfError = (func) => {
      try {
        return func();
      } catch (e) {
        abort(e);
      }
    };
  
  
  var sigToWasmTypes = (sig) => {
      assert(!sig.includes('j'), 'i64 not permitted in function signatures when WASM_BIGINT is disabled');
      var typeNames = {
        'i': 'i32',
        'j': 'i64',
        'f': 'f32',
        'd': 'f64',
        'e': 'externref',
        'p': 'i32',
      };
      var type = {
        parameters: [],
        results: sig[0] == 'v' ? [] : [typeNames[sig[0]]]
      };
      for (var i = 1; i < sig.length; ++i) {
        assert(sig[i] in typeNames, 'invalid signature char: ' + sig[i]);
        type.parameters.push(typeNames[sig[i]]);
      }
      return type;
    };
  
  var runtimeKeepalivePush = () => {
      runtimeKeepaliveCounter += 1;
    };
  
  var runtimeKeepalivePop = () => {
      assert(runtimeKeepaliveCounter > 0);
      runtimeKeepaliveCounter -= 1;
    };
  
  
  var Asyncify = {
  instrumentWasmImports(imports) {
        var importPattern = /^(invoke_.*|__asyncjs__.*)$/;
  
        for (let [x, original] of Object.entries(imports)) {
          let sig = original.sig;
          if (typeof original == 'function') {
            let isAsyncifyImport = original.isAsync || importPattern.test(x);
            imports[x] = (...args) => {
              var originalAsyncifyState = Asyncify.state;
              try {
                return original(...args);
              } finally {
                // Only asyncify-declared imports are allowed to change the
                // state.
                // Changing the state from normal to disabled is allowed (in any
                // function) as that is what shutdown does (and we don't have an
                // explicit list of shutdown imports).
                var changedToDisabled =
                      originalAsyncifyState === Asyncify.State.Normal &&
                      Asyncify.state        === Asyncify.State.Disabled;
                // invoke_* functions are allowed to change the state if we do
                // not ignore indirect calls.
                var ignoredInvoke = x.startsWith('invoke_') &&
                                    true;
                if (Asyncify.state !== originalAsyncifyState &&
                    !isAsyncifyImport &&
                    !changedToDisabled &&
                    !ignoredInvoke) {
                  throw new Error(`import ${x} was not in ASYNCIFY_IMPORTS, but changed the state`);
                }
              }
            };
          }
        }
      },
  instrumentWasmExports(exports) {
        var ret = {};
        for (let [x, original] of Object.entries(exports)) {
          if (typeof original == 'function') {
            ret[x] = (...args) => {
              Asyncify.exportCallStack.push(x);
              try {
                return original(...args);
              } finally {
                if (!ABORT) {
                  var y = Asyncify.exportCallStack.pop();
                  assert(y === x);
                  Asyncify.maybeStopUnwind();
                }
              }
            };
          } else {
            ret[x] = original;
          }
        }
        return ret;
      },
  State:{
  Normal:0,
  Unwinding:1,
  Rewinding:2,
  Disabled:3,
  },
  state:0,
  StackSize:4096,
  currData:null,
  handleSleepReturnValue:0,
  exportCallStack:[],
  callStackNameToId:{
  },
  callStackIdToName:{
  },
  callStackId:0,
  asyncPromiseHandlers:null,
  sleepCallbacks:[],
  getCallStackId(funcName) {
        var id = Asyncify.callStackNameToId[funcName];
        if (id === undefined) {
          id = Asyncify.callStackId++;
          Asyncify.callStackNameToId[funcName] = id;
          Asyncify.callStackIdToName[id] = funcName;
        }
        return id;
      },
  maybeStopUnwind() {
        if (Asyncify.currData &&
            Asyncify.state === Asyncify.State.Unwinding &&
            Asyncify.exportCallStack.length === 0) {
          // We just finished unwinding.
          // Be sure to set the state before calling any other functions to avoid
          // possible infinite recursion here (For example in debug pthread builds
          // the dbg() function itself can call back into WebAssembly to get the
          // current pthread_self() pointer).
          Asyncify.state = Asyncify.State.Normal;
          
          // Keep the runtime alive so that a re-wind can be done later.
          runAndAbortIfError(_asyncify_stop_unwind);
          if (typeof Fibers != 'undefined') {
            Fibers.trampoline();
          }
        }
      },
  whenDone() {
        assert(Asyncify.currData, 'Tried to wait for an async operation when none is in progress.');
        assert(!Asyncify.asyncPromiseHandlers, 'Cannot have multiple async operations in flight at once');
        return new Promise((resolve, reject) => {
          Asyncify.asyncPromiseHandlers = { resolve, reject };
        });
      },
  allocateData() {
        // An asyncify data structure has three fields:
        //  0  current stack pos
        //  4  max stack pos
        //  8  id of function at bottom of the call stack (callStackIdToName[id] == name of js function)
        //
        // The Asyncify ABI only interprets the first two fields, the rest is for the runtime.
        // We also embed a stack in the same memory region here, right next to the structure.
        // This struct is also defined as asyncify_data_t in emscripten/fiber.h
        var ptr = _malloc(12 + Asyncify.StackSize);
        Asyncify.setDataHeader(ptr, ptr + 12, Asyncify.StackSize);
        Asyncify.setDataRewindFunc(ptr);
        return ptr;
      },
  setDataHeader(ptr, stack, stackSize) {
        HEAPU32[((ptr)>>2)] = stack;
        HEAPU32[(((ptr)+(4))>>2)] = stack + stackSize;
      },
  setDataRewindFunc(ptr) {
        var bottomOfCallStack = Asyncify.exportCallStack[0];
        var rewindId = Asyncify.getCallStackId(bottomOfCallStack);
        HEAP32[(((ptr)+(8))>>2)] = rewindId;
      },
  getDataRewindFunc(ptr) {
        var id = HEAP32[(((ptr)+(8))>>2)];
        var name = Asyncify.callStackIdToName[id];
        var func = wasmExports[name];
        return func;
      },
  doRewind(ptr) {
        var start = Asyncify.getDataRewindFunc(ptr);
        // Once we have rewound and the stack we no longer need to artificially
        // keep the runtime alive.
        
        return start();
      },
  handleSleep(startAsync) {
        assert(Asyncify.state !== Asyncify.State.Disabled, 'Asyncify cannot be done during or after the runtime exits');
        if (ABORT) return;
        if (Asyncify.state === Asyncify.State.Normal) {
          // Prepare to sleep. Call startAsync, and see what happens:
          // if the code decided to call our callback synchronously,
          // then no async operation was in fact begun, and we don't
          // need to do anything.
          var reachedCallback = false;
          var reachedAfterCallback = false;
          startAsync((handleSleepReturnValue = 0) => {
            assert(!handleSleepReturnValue || typeof handleSleepReturnValue == 'number' || typeof handleSleepReturnValue == 'boolean'); // old emterpretify API supported other stuff
            if (ABORT) return;
            Asyncify.handleSleepReturnValue = handleSleepReturnValue;
            reachedCallback = true;
            if (!reachedAfterCallback) {
              // We are happening synchronously, so no need for async.
              return;
            }
            // This async operation did not happen synchronously, so we did
            // unwind. In that case there can be no compiled code on the stack,
            // as it might break later operations (we can rewind ok now, but if
            // we unwind again, we would unwind through the extra compiled code
            // too).
            assert(!Asyncify.exportCallStack.length, 'Waking up (starting to rewind) must be done from JS, without compiled code on the stack.');
            Asyncify.state = Asyncify.State.Rewinding;
            runAndAbortIfError(() => _asyncify_start_rewind(Asyncify.currData));
            if (typeof Browser != 'undefined' && Browser.mainLoop.func) {
              Browser.mainLoop.resume();
            }
            var asyncWasmReturnValue, isError = false;
            try {
              asyncWasmReturnValue = Asyncify.doRewind(Asyncify.currData);
            } catch (err) {
              asyncWasmReturnValue = err;
              isError = true;
            }
            // Track whether the return value was handled by any promise handlers.
            var handled = false;
            if (!Asyncify.currData) {
              // All asynchronous execution has finished.
              // `asyncWasmReturnValue` now contains the final
              // return value of the exported async WASM function.
              //
              // Note: `asyncWasmReturnValue` is distinct from
              // `Asyncify.handleSleepReturnValue`.
              // `Asyncify.handleSleepReturnValue` contains the return
              // value of the last C function to have executed
              // `Asyncify.handleSleep()`, where as `asyncWasmReturnValue`
              // contains the return value of the exported WASM function
              // that may have called C functions that
              // call `Asyncify.handleSleep()`.
              var asyncPromiseHandlers = Asyncify.asyncPromiseHandlers;
              if (asyncPromiseHandlers) {
                Asyncify.asyncPromiseHandlers = null;
                (isError ? asyncPromiseHandlers.reject : asyncPromiseHandlers.resolve)(asyncWasmReturnValue);
                handled = true;
              }
            }
            if (isError && !handled) {
              // If there was an error and it was not handled by now, we have no choice but to
              // rethrow that error into the global scope where it can be caught only by
              // `onerror` or `onunhandledpromiserejection`.
              throw asyncWasmReturnValue;
            }
          });
          reachedAfterCallback = true;
          if (!reachedCallback) {
            // A true async operation was begun; start a sleep.
            Asyncify.state = Asyncify.State.Unwinding;
            // TODO: reuse, don't alloc/free every sleep
            Asyncify.currData = Asyncify.allocateData();
            if (typeof Browser != 'undefined' && Browser.mainLoop.func) {
              Browser.mainLoop.pause();
            }
            runAndAbortIfError(() => _asyncify_start_unwind(Asyncify.currData));
          }
        } else if (Asyncify.state === Asyncify.State.Rewinding) {
          // Stop a resume.
          Asyncify.state = Asyncify.State.Normal;
          runAndAbortIfError(_asyncify_stop_rewind);
          _free(Asyncify.currData);
          Asyncify.currData = null;
          // Call all sleep callbacks now that the sleep-resume is all done.
          Asyncify.sleepCallbacks.forEach(callUserCallback);
        } else {
          abort(`invalid state: ${Asyncify.state}`);
        }
        return Asyncify.handleSleepReturnValue;
      },
  handleAsync(startAsync) {
        return Asyncify.handleSleep((wakeUp) => {
          // TODO: add error handling as a second param when handleSleep implements it.
          startAsync().then(wakeUp);
        });
      },
  };



  var FS_unlink = (path) => FS.unlink(path);

  var FSNode = /** @constructor */ function(parent, name, mode, rdev) {
    if (!parent) {
      parent = this;  // root node sets parent to itself
    }
    this.parent = parent;
    this.mount = parent.mount;
    this.mounted = null;
    this.id = FS.nextInode++;
    this.name = name;
    this.mode = mode;
    this.node_ops = {};
    this.stream_ops = {};
    this.rdev = rdev;
  };
  var readMode = 292/*292*/ | 73/*73*/;
  var writeMode = 146/*146*/;
  Object.defineProperties(FSNode.prototype, {
   read: {
    get: /** @this{FSNode} */function() {
     return (this.mode & readMode) === readMode;
    },
    set: /** @this{FSNode} */function(val) {
     val ? this.mode |= readMode : this.mode &= ~readMode;
    }
   },
   write: {
    get: /** @this{FSNode} */function() {
     return (this.mode & writeMode) === writeMode;
    },
    set: /** @this{FSNode} */function(val) {
     val ? this.mode |= writeMode : this.mode &= ~writeMode;
    }
   },
   isFolder: {
    get: /** @this{FSNode} */function() {
     return FS.isDir(this.mode);
    }
   },
   isDevice: {
    get: /** @this{FSNode} */function() {
     return FS.isChrdev(this.mode);
    }
   }
  });
  FS.FSNode = FSNode;
  FS.createPreloadedFile = FS_createPreloadedFile;
  FS.staticInit();Module["FS_createPath"] = FS.createPath;Module["FS_createDataFile"] = FS.createDataFile;Module["FS_createPreloadedFile"] = FS.createPreloadedFile;Module["FS_unlink"] = FS.unlink;Module["FS_createLazyFile"] = FS.createLazyFile;Module["FS_createDevice"] = FS.createDevice;;

      // exports
      Module["requestFullscreen"] = Browser.requestFullscreen;
      Module["requestFullScreen"] = Browser.requestFullScreen;
      Module["requestAnimationFrame"] = Browser.requestAnimationFrame;
      Module["setCanvasSize"] = Browser.setCanvasSize;
      Module["pauseMainLoop"] = Browser.mainLoop.pause;
      Module["resumeMainLoop"] = Browser.mainLoop.resume;
      Module["getUserMedia"] = Browser.getUserMedia;
      Module["createContext"] = Browser.createContext;
      var preloadedImages = {};
      var preloadedAudios = {};;
Fetch.init();;
var GLctx;;
var miniTempWebGLFloatBuffersStorage = new Float32Array(288);
  for (/**@suppress{duplicate}*/var i = 0; i < 288; ++i) {
    miniTempWebGLFloatBuffers[i] = miniTempWebGLFloatBuffersStorage.subarray(0, i+1);
  };
function checkIncomingModuleAPI() {
  ignoredModuleProp('fetchSettings');
}
var wasmImports = {
  /** @export */
  __assert_fail: ___assert_fail,
  /** @export */
  __syscall_fcntl64: ___syscall_fcntl64,
  /** @export */
  __syscall_fstat64: ___syscall_fstat64,
  /** @export */
  __syscall_getdents64: ___syscall_getdents64,
  /** @export */
  __syscall_ioctl: ___syscall_ioctl,
  /** @export */
  __syscall_lstat64: ___syscall_lstat64,
  /** @export */
  __syscall_mkdirat: ___syscall_mkdirat,
  /** @export */
  __syscall_newfstatat: ___syscall_newfstatat,
  /** @export */
  __syscall_openat: ___syscall_openat,
  /** @export */
  __syscall_stat64: ___syscall_stat64,
  /** @export */
  _emscripten_fetch_free: __emscripten_fetch_free,
  /** @export */
  _emscripten_get_now_is_monotonic: __emscripten_get_now_is_monotonic,
  /** @export */
  _mmap_js: __mmap_js,
  /** @export */
  _munmap_js: __munmap_js,
  /** @export */
  alBufferData: _alBufferData,
  /** @export */
  alDeleteBuffers: _alDeleteBuffers,
  /** @export */
  alGenBuffers: _alGenBuffers,
  /** @export */
  alGenSources: _alGenSources,
  /** @export */
  alGetError: _alGetError,
  /** @export */
  alGetSourcei: _alGetSourcei,
  /** @export */
  alSourcePlay: _alSourcePlay,
  /** @export */
  alSourcef: _alSourcef,
  /** @export */
  alSourcei: _alSourcei,
  /** @export */
  alcCloseDevice: _alcCloseDevice,
  /** @export */
  alcCreateContext: _alcCreateContext,
  /** @export */
  alcDestroyContext: _alcDestroyContext,
  /** @export */
  alcGetString: _alcGetString,
  /** @export */
  alcMakeContextCurrent: _alcMakeContextCurrent,
  /** @export */
  alcOpenDevice: _alcOpenDevice,
  /** @export */
  emscripten_date_now: _emscripten_date_now,
  /** @export */
  emscripten_get_now: _emscripten_get_now,
  /** @export */
  emscripten_is_main_browser_thread: _emscripten_is_main_browser_thread,
  /** @export */
  emscripten_memcpy_js: _emscripten_memcpy_js,
  /** @export */
  emscripten_resize_heap: _emscripten_resize_heap,
  /** @export */
  emscripten_set_blur_callback_on_thread: _emscripten_set_blur_callback_on_thread,
  /** @export */
  emscripten_set_focus_callback_on_thread: _emscripten_set_focus_callback_on_thread,
  /** @export */
  emscripten_set_keydown_callback_on_thread: _emscripten_set_keydown_callback_on_thread,
  /** @export */
  emscripten_set_keypress_callback_on_thread: _emscripten_set_keypress_callback_on_thread,
  /** @export */
  emscripten_set_keyup_callback_on_thread: _emscripten_set_keyup_callback_on_thread,
  /** @export */
  emscripten_set_mousedown_callback_on_thread: _emscripten_set_mousedown_callback_on_thread,
  /** @export */
  emscripten_set_mousemove_callback_on_thread: _emscripten_set_mousemove_callback_on_thread,
  /** @export */
  emscripten_set_mouseup_callback_on_thread: _emscripten_set_mouseup_callback_on_thread,
  /** @export */
  emscripten_set_resize_callback_on_thread: _emscripten_set_resize_callback_on_thread,
  /** @export */
  emscripten_set_wheel_callback_on_thread: _emscripten_set_wheel_callback_on_thread,
  /** @export */
  emscripten_sleep: _emscripten_sleep,
  /** @export */
  emscripten_start_fetch: _emscripten_start_fetch,
  /** @export */
  emscripten_webgl_create_context: _emscripten_webgl_create_context,
  /** @export */
  emscripten_webgl_make_context_current: _emscripten_webgl_make_context_current,
  /** @export */
  environ_get: _environ_get,
  /** @export */
  environ_sizes_get: _environ_sizes_get,
  /** @export */
  exit: _exit,
  /** @export */
  fd_close: _fd_close,
  /** @export */
  fd_read: _fd_read,
  /** @export */
  fd_seek: _fd_seek,
  /** @export */
  fd_write: _fd_write,
  /** @export */
  get_device_pixel_ratio: get_device_pixel_ratio,
  /** @export */
  get_local_storage_into: get_local_storage_into,
  /** @export */
  get_local_storage_length: get_local_storage_length,
  /** @export */
  get_platform: get_platform,
  /** @export */
  get_window_height: get_window_height,
  /** @export */
  get_window_url_into: get_window_url_into,
  /** @export */
  get_window_url_length: get_window_url_length,
  /** @export */
  get_window_width: get_window_width,
  /** @export */
  glActiveTexture: _glActiveTexture,
  /** @export */
  glAttachShader: _glAttachShader,
  /** @export */
  glBindBuffer: _glBindBuffer,
  /** @export */
  glBindFramebuffer: _glBindFramebuffer,
  /** @export */
  glBindTexture: _glBindTexture,
  /** @export */
  glBindVertexArray: _glBindVertexArray,
  /** @export */
  glBlendFunc: _glBlendFunc,
  /** @export */
  glBufferData: _glBufferData,
  /** @export */
  glCheckFramebufferStatus: _glCheckFramebufferStatus,
  /** @export */
  glClear: _glClear,
  /** @export */
  glClearColor: _glClearColor,
  /** @export */
  glCompileShader: _glCompileShader,
  /** @export */
  glCreateProgram: _glCreateProgram,
  /** @export */
  glCreateShader: _glCreateShader,
  /** @export */
  glDeleteTextures: _glDeleteTextures,
  /** @export */
  glDisable: _glDisable,
  /** @export */
  glDrawArrays: _glDrawArrays,
  /** @export */
  glDrawArraysInstanced: _glDrawArraysInstanced,
  /** @export */
  glDrawElements: _glDrawElements,
  /** @export */
  glEnable: _glEnable,
  /** @export */
  glEnableVertexAttribArray: _glEnableVertexAttribArray,
  /** @export */
  glFramebufferTexture2D: _glFramebufferTexture2D,
  /** @export */
  glGenBuffers: _glGenBuffers,
  /** @export */
  glGenFramebuffers: _glGenFramebuffers,
  /** @export */
  glGenTextures: _glGenTextures,
  /** @export */
  glGenVertexArrays: _glGenVertexArrays,
  /** @export */
  glGenerateMipmap: _glGenerateMipmap,
  /** @export */
  glGetActiveAttrib: _glGetActiveAttrib,
  /** @export */
  glGetActiveUniform: _glGetActiveUniform,
  /** @export */
  glGetAttribLocation: _glGetAttribLocation,
  /** @export */
  glGetIntegerv: _glGetIntegerv,
  /** @export */
  glGetProgramInfoLog: _glGetProgramInfoLog,
  /** @export */
  glGetProgramiv: _glGetProgramiv,
  /** @export */
  glGetShaderInfoLog: _glGetShaderInfoLog,
  /** @export */
  glGetShaderiv: _glGetShaderiv,
  /** @export */
  glGetUniformLocation: _glGetUniformLocation,
  /** @export */
  glLinkProgram: _glLinkProgram,
  /** @export */
  glPixelStorei: _glPixelStorei,
  /** @export */
  glScissor: _glScissor,
  /** @export */
  glShaderSource: _glShaderSource,
  /** @export */
  glTexImage2D: _glTexImage2D,
  /** @export */
  glTexParameteri: _glTexParameteri,
  /** @export */
  glTexStorage3D: _glTexStorage3D,
  /** @export */
  glTexSubImage2D: _glTexSubImage2D,
  /** @export */
  glTexSubImage3D: _glTexSubImage3D,
  /** @export */
  glUniform1f: _glUniform1f,
  /** @export */
  glUniform1i: _glUniform1i,
  /** @export */
  glUniform2f: _glUniform2f,
  /** @export */
  glUniform2i: _glUniform2i,
  /** @export */
  glUniform3f: _glUniform3f,
  /** @export */
  glUniform3i: _glUniform3i,
  /** @export */
  glUniform4f: _glUniform4f,
  /** @export */
  glUniform4i: _glUniform4i,
  /** @export */
  glUniformMatrix4fv: _glUniformMatrix4fv,
  /** @export */
  glUseProgram: _glUseProgram,
  /** @export */
  glVertexAttribDivisor: _glVertexAttribDivisor,
  /** @export */
  glVertexAttribIPointer: _glVertexAttribIPointer,
  /** @export */
  glVertexAttribPointer: _glVertexAttribPointer,
  /** @export */
  glViewport: _glViewport,
  /** @export */
  make_canvas_focusable: make_canvas_focusable,
  /** @export */
  mp_connect_ws_internal: mp_connect_ws_internal,
  /** @export */
  mp_send_ws_internal: mp_send_ws_internal,
  /** @export */
  open_temp_text_file: open_temp_text_file,
  /** @export */
  open_url: open_url,
  /** @export */
  set_canvas_size: set_canvas_size,
  /** @export */
  set_cursor: set_cursor,
  /** @export */
  set_document_title: set_document_title,
  /** @export */
  set_local_storage: set_local_storage,
  /** @export */
  setup_drag_drop_handlers_internal: setup_drag_drop_handlers_internal
};
Asyncify.instrumentWasmImports(wasmImports);
var wasmExports = createWasm();
var ___wasm_call_ctors = createExportWrapper('__wasm_call_ctors');
var _free = createExportWrapper('free');
var _malloc = createExportWrapper('malloc');
var _fflush = createExportWrapper('fflush');
var _windy_file_drop_callback = Module['_windy_file_drop_callback'] = createExportWrapper('windy_file_drop_callback');
var _mp_on_message = Module['_mp_on_message'] = createExportWrapper('mp_on_message');
var _main = Module['_main'] = createExportWrapper('main');
var _emscripten_builtin_memalign = createExportWrapper('emscripten_builtin_memalign');
var _emscripten_stack_init = () => (_emscripten_stack_init = wasmExports['emscripten_stack_init'])();
var _emscripten_stack_get_free = () => (_emscripten_stack_get_free = wasmExports['emscripten_stack_get_free'])();
var _emscripten_stack_get_base = () => (_emscripten_stack_get_base = wasmExports['emscripten_stack_get_base'])();
var _emscripten_stack_get_end = () => (_emscripten_stack_get_end = wasmExports['emscripten_stack_get_end'])();
var stackSave = createExportWrapper('stackSave');
var stackRestore = createExportWrapper('stackRestore');
var stackAlloc = createExportWrapper('stackAlloc');
var _emscripten_stack_get_current = () => (_emscripten_stack_get_current = wasmExports['emscripten_stack_get_current'])();
var dynCall_iii = Module['dynCall_iii'] = createExportWrapper('dynCall_iii');
var dynCall_vi = Module['dynCall_vi'] = createExportWrapper('dynCall_vi');
var dynCall_vii = Module['dynCall_vii'] = createExportWrapper('dynCall_vii');
var dynCall_viii = Module['dynCall_viii'] = createExportWrapper('dynCall_viii');
var dynCall_iiii = Module['dynCall_iiii'] = createExportWrapper('dynCall_iiii');
var dynCall_ii = Module['dynCall_ii'] = createExportWrapper('dynCall_ii');
var dynCall_ijj = Module['dynCall_ijj'] = createExportWrapper('dynCall_ijj');
var dynCall_viiii = Module['dynCall_viiii'] = createExportWrapper('dynCall_viiii');
var dynCall_v = Module['dynCall_v'] = createExportWrapper('dynCall_v');
var dynCall_jiji = Module['dynCall_jiji'] = createExportWrapper('dynCall_jiji');
var dynCall_iidiiii = Module['dynCall_iidiiii'] = createExportWrapper('dynCall_iidiiii');
var _asyncify_start_unwind = createExportWrapper('asyncify_start_unwind');
var _asyncify_stop_unwind = createExportWrapper('asyncify_stop_unwind');
var _asyncify_start_rewind = createExportWrapper('asyncify_start_rewind');
var _asyncify_stop_rewind = createExportWrapper('asyncify_stop_rewind');
var ___start_em_js = Module['___start_em_js'] = 235104;
var ___stop_em_js = Module['___stop_em_js'] = 239303;

// include: postamble.js
// === Auto-generated postamble setup entry stuff ===

Module['addRunDependency'] = addRunDependency;
Module['removeRunDependency'] = removeRunDependency;
Module['FS_createPath'] = FS.createPath;
Module['FS_createLazyFile'] = FS.createLazyFile;
Module['FS_createDevice'] = FS.createDevice;
Module['FS_createPreloadedFile'] = FS.createPreloadedFile;
Module['FS_createDataFile'] = FS.createDataFile;
Module['FS_unlink'] = FS.unlink;
var missingLibrarySymbols = [
  'writeI53ToI64Clamped',
  'writeI53ToI64Signaling',
  'writeI53ToU64Clamped',
  'writeI53ToU64Signaling',
  'convertI32PairToI53',
  'convertU32PairToI53',
  'isLeapYear',
  'ydayFromDate',
  'arraySum',
  'addDays',
  'inetPton4',
  'inetNtop4',
  'inetPton6',
  'inetNtop6',
  'readSockaddr',
  'writeSockaddr',
  'getCallstack',
  'emscriptenLog',
  'convertPCtoSourceLocation',
  'readEmAsmArgs',
  'dynCallLegacy',
  'getDynCaller',
  'dynCall',
  'asmjsMangle',
  'getNativeTypeSize',
  'STACK_SIZE',
  'STACK_ALIGN',
  'POINTER_SIZE',
  'ASSERTIONS',
  'getCFunc',
  'ccall',
  'cwrap',
  'uleb128Encode',
  'generateFuncType',
  'convertJsFunctionToWasm',
  'getEmptyTableSlot',
  'updateTableMap',
  'getFunctionAddress',
  'addFunction',
  'removeFunction',
  'reallyNegative',
  'unSign',
  'strLen',
  'reSign',
  'formatString',
  'intArrayToString',
  'AsciiToString',
  'UTF16ToString',
  'stringToUTF16',
  'lengthBytesUTF16',
  'UTF32ToString',
  'stringToUTF32',
  'lengthBytesUTF32',
  'writeArrayToMemory',
  'fillDeviceOrientationEventData',
  'registerDeviceOrientationEventCallback',
  'fillDeviceMotionEventData',
  'registerDeviceMotionEventCallback',
  'screenOrientation',
  'fillOrientationChangeEventData',
  'registerOrientationChangeEventCallback',
  'fillFullscreenChangeEventData',
  'registerFullscreenChangeEventCallback',
  'JSEvents_requestFullscreen',
  'JSEvents_resizeCanvasForFullscreen',
  'registerRestoreOldStyle',
  'hideEverythingExceptGivenElement',
  'restoreHiddenElements',
  'setLetterbox',
  'softFullscreenResizeWebGLRenderTarget',
  'doRequestFullscreen',
  'fillPointerlockChangeEventData',
  'registerPointerlockChangeEventCallback',
  'registerPointerlockErrorEventCallback',
  'requestPointerLock',
  'fillVisibilityChangeEventData',
  'registerVisibilityChangeEventCallback',
  'registerTouchEventCallback',
  'fillGamepadEventData',
  'registerGamepadEventCallback',
  'registerBeforeUnloadEventCallback',
  'fillBatteryEventData',
  'battery',
  'registerBatteryEventCallback',
  'setCanvasElementSize',
  'getCanvasElementSize',
  'jsStackTrace',
  'stackTrace',
  'checkWasiClock',
  'wasiRightsToMuslOFlags',
  'wasiOFlagsToMuslOFlags',
  'createDyncallWrapper',
  'setImmediateWrapped',
  'clearImmediateWrapped',
  'polyfillSetImmediate',
  'getPromise',
  'makePromise',
  'idsToPromises',
  'makePromiseCallback',
  'ExceptionInfo',
  'findMatchingCatch',
  'Browser_asyncPrepareDataCounter',
  'getSocketFromFD',
  'getSocketAddress',
  'FS_mkdirTree',
  '_setNetworkCallback',
  'emscriptenWebGLGetUniform',
  'emscriptenWebGLGetVertexAttrib',
  'emscriptenWebGLGetBufferBinding',
  'emscriptenWebGLValidateMapBufferTarget',
  'writeGLArray',
  'registerWebGlEventCallback',
  'SDL_unicode',
  'SDL_ttfContext',
  'SDL_audio',
  'emscriptenWebGLGetIndexed',
  'ALLOC_NORMAL',
  'ALLOC_STACK',
  'allocate',
  'writeStringToMemory',
  'writeAsciiToMemory',
  'setErrNo',
  'demangle',
];
missingLibrarySymbols.forEach(missingLibrarySymbol)

var unexportedSymbols = [
  'run',
  'addOnPreRun',
  'addOnInit',
  'addOnPreMain',
  'addOnExit',
  'addOnPostRun',
  'FS_createFolder',
  'FS_createLink',
  'FS_readFile',
  'out',
  'err',
  'callMain',
  'abort',
  'wasmMemory',
  'wasmExports',
  'stackAlloc',
  'stackSave',
  'stackRestore',
  'getTempRet0',
  'setTempRet0',
  'writeStackCookie',
  'checkStackCookie',
  'writeI53ToI64',
  'readI53FromI64',
  'readI53FromU64',
  'convertI32PairToI53Checked',
  'ptrToString',
  'zeroMemory',
  'exitJS',
  'getHeapMax',
  'growMemory',
  'ENV',
  'MONTH_DAYS_REGULAR',
  'MONTH_DAYS_LEAP',
  'MONTH_DAYS_REGULAR_CUMULATIVE',
  'MONTH_DAYS_LEAP_CUMULATIVE',
  'ERRNO_CODES',
  'ERRNO_MESSAGES',
  'DNS',
  'Protocols',
  'Sockets',
  'initRandomFill',
  'randomFill',
  'timers',
  'warnOnce',
  'UNWIND_CACHE',
  'readEmAsmArgsArray',
  'jstoi_q',
  'jstoi_s',
  'getExecutableName',
  'listenOnce',
  'autoResumeAudioContext',
  'handleException',
  'keepRuntimeAlive',
  'runtimeKeepalivePush',
  'runtimeKeepalivePop',
  'callUserCallback',
  'maybeExit',
  'asyncLoad',
  'alignMemory',
  'mmapAlloc',
  'HandleAllocator',
  'wasmTable',
  'noExitRuntime',
  'sigToWasmTypes',
  'freeTableIndexes',
  'functionsInTableMap',
  'setValue',
  'getValue',
  'PATH',
  'PATH_FS',
  'UTF8Decoder',
  'UTF8ArrayToString',
  'UTF8ToString',
  'stringToUTF8Array',
  'stringToUTF8',
  'lengthBytesUTF8',
  'intArrayFromString',
  'stringToAscii',
  'UTF16Decoder',
  'stringToNewUTF8',
  'stringToUTF8OnStack',
  'JSEvents',
  'registerKeyEventCallback',
  'specialHTMLTargets',
  'maybeCStringToJsString',
  'findEventTarget',
  'findCanvasEventTarget',
  'getBoundingClientRect',
  'fillMouseEventData',
  'registerMouseEventCallback',
  'registerWheelEventCallback',
  'registerUiEventCallback',
  'registerFocusEventCallback',
  'currentFullscreenStrategy',
  'restoreOldWindowedStyle',
  'ExitStatus',
  'getEnvStrings',
  'doReadv',
  'doWritev',
  'safeSetTimeout',
  'promiseMap',
  'uncaughtExceptionCount',
  'exceptionLast',
  'exceptionCaught',
  'Browser',
  'setMainLoop',
  'getPreloadedImageData__data',
  'wget',
  'SYSCALLS',
  'preloadPlugins',
  'FS_modeStringToFlags',
  'FS_getMode',
  'FS_stdin_getChar_buffer',
  'FS_stdin_getChar',
  'FS',
  'MEMFS',
  'TTY',
  'PIPEFS',
  'SOCKFS',
  'tempFixedLengthArray',
  'miniTempWebGLFloatBuffers',
  'miniTempWebGLIntBuffers',
  'heapObjectForWebGLType',
  'toTypedArrayIndex',
  'webgl_enable_ANGLE_instanced_arrays',
  'webgl_enable_OES_vertex_array_object',
  'webgl_enable_WEBGL_draw_buffers',
  'webgl_enable_WEBGL_multi_draw',
  'GL',
  'emscriptenWebGLGet',
  'computeUnpackAlignedImageSize',
  'colorChannelsInGlTextureFormat',
  'emscriptenWebGLGetTexPixelData',
  'webglGetUniformLocation',
  'webglPrepareUniformLocationsBeforeFirstUse',
  'webglGetLeftBracePos',
  '__glGetActiveAttribOrUniform',
  'AL',
  'GLUT',
  'EGL',
  'GLEW',
  'IDBStore',
  'runAndAbortIfError',
  'Asyncify',
  'Fibers',
  'SDL',
  'SDL_gfx',
  'webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance',
  'webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance',
  'allocateUTF8',
  'allocateUTF8OnStack',
  'Fetch',
  'fetchDeleteCachedData',
  'fetchLoadCachedData',
  'fetchCacheData',
  'fetchXHR',
];
unexportedSymbols.forEach(unexportedRuntimeSymbol);



var calledRun;

dependenciesFulfilled = function runCaller() {
  // If run has never been called, and we should call run (INVOKE_RUN is true, and Module.noInitialRun is not false)
  if (!calledRun) run();
  if (!calledRun) dependenciesFulfilled = runCaller; // try this again later, after new deps are fulfilled
};

function callMain(args = []) {
  assert(runDependencies == 0, 'cannot call main when async dependencies remain! (listen on Module["onRuntimeInitialized"])');
  assert(__ATPRERUN__.length == 0, 'cannot call main when preRun functions remain to be called');

  var entryFunction = _main;

  args.unshift(thisProgram);

  var argc = args.length;
  var argv = stackAlloc((argc + 1) * 4);
  var argv_ptr = argv;
  args.forEach((arg) => {
    HEAPU32[((argv_ptr)>>2)] = stringToUTF8OnStack(arg);
    argv_ptr += 4;
  });
  HEAPU32[((argv_ptr)>>2)] = 0;

  try {

    var ret = entryFunction(argc, argv);

    // if we're not running an evented main loop, it's time to exit
    exitJS(ret, /* implicit = */ true);
    return ret;
  }
  catch (e) {
    return handleException(e);
  }
}

function stackCheckInit() {
  // This is normally called automatically during __wasm_call_ctors but need to
  // get these values before even running any of the ctors so we call it redundantly
  // here.
  _emscripten_stack_init();
  // TODO(sbc): Move writeStackCookie to native to to avoid this.
  writeStackCookie();
}

function run(args = arguments_) {

  if (runDependencies > 0) {
    return;
  }

    stackCheckInit();

  preRun();

  // a preRun added a dependency, run will be called later
  if (runDependencies > 0) {
    return;
  }

  function doRun() {
    // run may have just been called through dependencies being fulfilled just in this very frame,
    // or while the async setStatus time below was happening
    if (calledRun) return;
    calledRun = true;
    Module['calledRun'] = true;

    if (ABORT) return;

    initRuntime();

    preMain();

    if (Module['onRuntimeInitialized']) Module['onRuntimeInitialized']();

    if (shouldRunNow) callMain(args);

    postRun();
  }

  if (Module['setStatus']) {
    Module['setStatus']('Running...');
    setTimeout(function() {
      setTimeout(function() {
        Module['setStatus']('');
      }, 1);
      doRun();
    }, 1);
  } else
  {
    doRun();
  }
  checkStackCookie();
}

function checkUnflushedContent() {
  // Compiler settings do not allow exiting the runtime, so flushing
  // the streams is not possible. but in ASSERTIONS mode we check
  // if there was something to flush, and if so tell the user they
  // should request that the runtime be exitable.
  // Normally we would not even include flush() at all, but in ASSERTIONS
  // builds we do so just for this check, and here we see if there is any
  // content to flush, that is, we check if there would have been
  // something a non-ASSERTIONS build would have not seen.
  // How we flush the streams depends on whether we are in SYSCALLS_REQUIRE_FILESYSTEM=0
  // mode (which has its own special function for this; otherwise, all
  // the code is inside libc)
  var oldOut = out;
  var oldErr = err;
  var has = false;
  out = err = (x) => {
    has = true;
  }
  try { // it doesn't matter if it fails
    _fflush(0);
    // also flush in the JS FS layer
    ['stdout', 'stderr'].forEach(function(name) {
      var info = FS.analyzePath('/dev/' + name);
      if (!info) return;
      var stream = info.object;
      var rdev = stream.rdev;
      var tty = TTY.ttys[rdev];
      if (tty?.output?.length) {
        has = true;
      }
    });
  } catch(e) {}
  out = oldOut;
  err = oldErr;
  if (has) {
    warnOnce('stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the Emscripten FAQ), or make sure to emit a newline when you printf etc.');
  }
}

if (Module['preInit']) {
  if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];
  while (Module['preInit'].length > 0) {
    Module['preInit'].pop()();
  }
}

// shouldRunNow refers to calling main(), not run().
var shouldRunNow = true;

if (Module['noInitialRun']) shouldRunNow = false;

run();


// end include: postamble.js
