/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["2018/01/05/VueInAction1/index.html","fa54048462bdd3bcbfe1375cbcbed9a2"],["2018/01/05/hexoml/index.html","2cb520399d740fbce6c17311334ecacd"],["2018/01/08/v-model/index.html","d131bcfe41487d2519648da22455ee1a"],["2018/01/12/VueInAction2/index.html","fc4a29206d1c8f0b1edb54eb124f695b"],["2018/01/13/Array/index.html","53ed884293fb9f6c8090af91bfee2cf3"],["2018/01/16/instanceof/index.html","72b4073f89c30ddb0fc569c69ed2ad48"],["2018/01/18/prototype/index.html","7e1a55cf420bbd5a45ede6e43ae8553d"],["2018/03/07/this/index.html","f5add72bd627e27c28d66a7dec4ba09a"],["2018/03/10/jsMemoryManagent/index.html","fa890e7943d4fcc043f12bc28ab30fab"],["2018/03/25/debounce/index.html","ac3f41f378501695aa857695e71fbcf1"],["2018/03/28/toLittleCute/index.html","398f851c558b44d80355df46d0f4af53"],["2018/04/02/面试/index.html","deab67b8c2b9110b277984c5a3ccd83d"],["2018/04/05/JSX/index.html","42aaf3c934c9a9c9720e9e2f0a2cc9ea"],["2018/04/10/axioshhh/index.html","1c537cb11d5254eca176ab2c2bcd6709"],["2018/04/18/template/index.html","e1886615cb2d4db26b6eda61c6d9b533"],["2018/04/19/http/index.html","ff0c0fcc68f9d3f732f8d4d05390ede6"],["2018/04/29/Vue-lifecycle/index.html","e23368bfa7f3490bb6e0726b0144a685"],["2018/04/29/timetravel/index.html","2aa73d11f1f9c464543bad7f905edfca"],["2018/05/20/流行的云/index.html","a851deecefb7a375caae827e0115e284"],["2018/05/23/friendships/index.html","5a530bee9e4b4b7f50f26995871621ef"],["2018/06/01/ReactNativeComponent/index.html","faf680eb3465023c2d0dc9a98217129f"],["2018/06/08/choppingHand1/index.html","a62cfa0310f8d93c0caca78c18e07872"],["2018/06/15/choppingHand2/index.html","fad837e8a5d06136f1f1885797624ffd"],["2018/07/19/Ngnix/index.html","e533feef1b72cf7a56d9c088f4e92b34"],["2018/07/25/sort/index.html","53876c5502dc07d58f0dda13140ef279"],["2018/08/07/koaMiddle/index.html","52d0978d652441bc654ec601705965d5"],["2018/12/07/git杂记/index.html","1b7be55d6e387cc4f99cad8cf0e8a8bb"],["2018/12/31/selfPromise/index.html","320132d53dcb01cd3b730e5cacba8d45"],["2019/01/04/react的setState/index.html","b361d78c117c3b85f306b3d040c652f6"],["2019/01/17/vue的diff/index.html","3700d7031c4bdad938632414717e18c1"],["2019/07/22/封培总结/index.html","881625f1fa8ac09aa5b491ed221f4f84"],["2019/07/25/MingJingNote/index.html","927294dcf27f0339e58d23ef71e2d90f"],["2019/08/07/Quic/index.html","4aa1271ba2c77feb7a7d4cacbf097338"],["about/index.html","5f0c622721a9c8a40c04357728d3153b"],["archives/2018/01/index.html","28c8c3bfd5825218f56750b60b0180c1"],["archives/2018/03/index.html","2d3c9b7b7ef75148c82f8a33156996d0"],["archives/2018/04/index.html","f8360412cac561fa504cb0d3f951bc27"],["archives/2018/05/index.html","f1fa6e54500428e255266c967614247c"],["archives/2018/06/index.html","55d7fb16707fad1556eec5aa71de4058"],["archives/2018/07/index.html","628aef834cf9cae1e6697afdb7dc0a63"],["archives/2018/08/index.html","e3d6a2b308fdb9580951c3cc1d0a85b2"],["archives/2018/12/index.html","0b5fb2b76bbb8e8e856e44be73c1cdea"],["archives/2018/index.html","c14c1e863ec5ba18b6e9124d93df7528"],["archives/2018/page/2/index.html","43e77206cd8e03258dd555754e1a75aa"],["archives/2018/page/3/index.html","68a119b0a7e5144a518922d9b2a96b3f"],["archives/2019/01/index.html","2a8397c81a7734396842f04133136b18"],["archives/2019/07/index.html","1067dc3fbe090eeac0a52d7f8d245fde"],["archives/2019/08/index.html","2ded5f7ca3b51ca8718a2c07ee5e2f04"],["archives/2019/index.html","5ccb0cd28684e5096315597d2ccd6f48"],["archives/index.html","dbf2ee47884d92ec1a2ff42d5fd51616"],["archives/page/2/index.html","8fd2e576bed9e18bcb9596cb373df944"],["archives/page/3/index.html","11c1724a9e333270bc01692b49e71d06"],["archives/page/4/index.html","1fb056ca0007c0a4d9d4399d5d577f05"],["assets/css/APlayer.min.css","fbe994054426fadb2dff69d824c5c67a"],["assets/css/DPlayer.min.css","31ac9b1a5a7f018dcc9a0e0f66261c08"],["assets/js/APlayer.min.js","8f1017e7a73737e631ff95fa51e4e7d7"],["assets/js/DPlayer.min.js","4097986cff510567068128f4b18004a6"],["assets/js/Meting.min.js","bfac0368480fd344282ec018d28f173d"],["categories/学习/index.html","50737eea985452bc6ffc33d8e57a177a"],["categories/学习/page/2/index.html","4362b779bd2c37cad75eed2388c04e0c"],["categories/学习/page/3/index.html","43e125e31220b7034e5eb7d5c671e488"],["categories/指弹/index.html","46c07f23438dd6a7ed654861b84e15d6"],["categories/生活/index.html","cb0b811c5822ebabcbf5b8d21ee2c187"],["css/default.css","e5e684d21cb02e9f7e81a2b722bddafc"],["css/donate.css","a68e4a34e814ce3334186286f4655440"],["donate/index.html","6d6b078133399bfa400633ee47b5c6e1"],["img/AliPayQR.png","1511d0c6f91582f2b7bf20d9b0956f87"],["img/BTCQR.png","a48f0b8d3aa8c07adbeffe2979b2e5a4"],["img/WeChatQR.png","8369323e99c4c96518e1297b47a71428"],["img/alipay.svg","9239702087add999b29eda6c69b7fac3"],["img/bitcoin.svg","73007d7f0ee6052c13edec23f0ee5c78"],["img/github.svg","23fc8f81f92bb2981d8f9e089d7df14a"],["img/like.svg","335eff6a0aefd9ce25d8624c9cae2f54"],["img/paypal.svg","96fa023e7e12051f7585b6fe4da53daf"],["img/wechat.svg","f9bcef76a75dae0e4fe6bf3d3af1cad3"],["index.html","440ca6e6051b5bbb7db361175fce429c"],["js/codeblock-resizer.js","f70200751db2c1b3cff95884d7ecc132"],["js/donate.js","c5119c5bdd5049d805e03af774a47472"],["js/fancybox.js","7a432f63d671adfa0cb9a5458c6db4a8"],["js/gitment.browser.js","434949e3fa004587f73aada62910cfc4"],["js/search.js","2d82d5f1f7964cab86b4df17fcc946f9"],["js/share.js","013db0d5d1e2a227ac821fe8f0af678d"],["js/smartresize.js","14d842f8dea14c352b055b4e9de5cf07"],["js/totop.js","4ec0df4fc761d8a5433c8f0ba94750f7"],["live2d/assets/moc/wanko.1024/texture_00.png","10b7047251205db46fdac7632b5d4642"],["live2d/device.min.js","86a721c7735b03a0c12b172431e5cb2c"],["live2d/script.js","7d75535f43af497883c1b9a1b88c9e1a"],["page/2/index.html","c8c0e557b449bc994834b582109c9721"],["page/3/index.html","9703986fd4fa3b99793812ea639ea1ac"],["page/4/index.html","4e44543cf425c776ffc15cd480544151"],["tags/About/index.html","dd2d2374df4b65a1eb4d7846e7dc586c"],["tags/Hexo/index.html","b16938c1b810822544d6df0d8edb241c"],["tags/React-Native/index.html","bb231c1bb43ecfdd5325579b98ddec34"],["tags/http/index.html","513b7e8b3578d02474d7cc7859456261"],["tags/javascript/index.html","23d33330d32e29de996a11ceec22088a"],["tags/koa/index.html","89b45df7470b1c47cb3989eda2e95bf6"],["tags/react/index.html","18d6bdb5779e6fc92cf5fc3d1c0d7718"],["tags/vue/index.html","02c4cc003c298f943fd4f2ab8b69451b"],["tags/不知道归为哪一列系列/index.html","042f8f0bdfa58820cc2731195d588fa1"],["tags/学习/index.html","8e2ede7c2a752520641ab73340ee0f62"],["tags/指弹/index.html","9a22b1d8bd25b5e023e6160a603feee8"],["tags/杂记/index.html","1efa5c119bdf67abb423942fc32d0766"],["tags/算法/index.html","81166cec1decd6a6a84d7f4521bd401f"],["youlian/index.html","57457c2ea7af09306dc12a1acbd24a43"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







