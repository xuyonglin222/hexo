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

var precacheConfig = [["2018/01/05/VueInAction1/index.html","5ffec176b4721c78a8eaca6861754342"],["2018/01/05/hexoml/index.html","4d82e00df980bfb8c8dadd0498a85944"],["2018/01/08/v-model/index.html","719dec4b8c76e043341cfe94422a29fd"],["2018/01/12/VueInAction2/index.html","670ea21822357f128f3f5c05db2f7ecf"],["2018/01/13/Array/index.html","defda8c6042a5dfe62d1a33dc76f17ee"],["2018/01/16/instanceof/index.html","8ade9991b15e2be95f981fc28343080d"],["2018/01/18/prototype/index.html","d6f9e072c041c451f4c3167052a8ca11"],["2018/03/07/this/index.html","ee3b9293a79c4c92c5a67e9c6908ddce"],["2018/03/10/jsMemoryManagent/index.html","6daa5b4284a039b7a91d8d7bad86d2e4"],["2018/03/25/debounce/index.html","e3181e848f1933b7dd38fdb541366dd6"],["2018/03/28/toLittleCute/index.html","719e5e1b10c4c567a2503d9d258b8a40"],["2018/04/02/面试/index.html","67a67e4725a68711a30fcc5300c7fb2e"],["2018/04/05/JSX/index.html","fec3e32710a639dfcda4894d24a7ebaf"],["2018/04/10/axioshhh/index.html","b27b5a478599a90f753baa1d55f2da6f"],["2018/04/18/template/index.html","f9f8629af46ab5690873d920165271df"],["2018/04/19/http/index.html","6313ca844a38b9911015aff7d3f33145"],["2018/04/29/Vue-lifecycle/index.html","4bd969a3b3087f662d6d4f3d9772c1e9"],["2018/04/29/timetravel/index.html","7c6410d7eafa2a53abe0d5f8b07a01df"],["2018/05/20/流行的云/index.html","0945d90ad941c5bd0f5220bc7f5810d9"],["2018/05/23/friendships/index.html","71010b9ebb4fcc88f145a5fc9d11bcc4"],["2018/06/01/ReactNativeComponent/index.html","a253c831d626f2e364601b6e653f86a7"],["2018/06/08/choppingHand1/index.html","57ed2323f312e813b2cd4ab26aee3eb7"],["2018/06/15/choppingHand2/index.html","86dbe688b053d37acd806050b37764b4"],["2018/07/19/Ngnix/index.html","ceb836e0f537369f5597d5ca14aef242"],["2018/07/25/sort/index.html","f9c0f4640e11f0947359271fba9c55bf"],["2018/08/07/koaMiddle/index.html","8a112d3587b232a4e12644ee5a0d3a87"],["2018/12/07/git杂记/index.html","5624a66910adf151e1b58e26fb225e78"],["2018/12/31/selfPromise/index.html","9eb7f400aa83426893eb8b179314c6cd"],["2019/01/04/react的setState/index.html","5364207b8c555885e54059ca01df9d79"],["2019/01/17/vue的diff/index.html","0034d8227236ecfff656439ad2aa1b53"],["2019/07/22/封培总结/index.html","559539e8be8677e6ff2734347e0d79a0"],["2019/07/25/MingJingNote/index.html","cd4c0a1f73645e21de99404114fed395"],["README.html","ec1b62d42a113e4f2d20b141d60abc6e"],["about/index.html","c6c3285e850d8f9acb7581568b69065a"],["archives/2018/01/index.html","04b0ecf424555eb062cdd568ee749ddc"],["archives/2018/03/index.html","ba375e1700450bb8034cf02eec8913b3"],["archives/2018/04/index.html","35319d7aab1d914f6b5e27683bc4a777"],["archives/2018/05/index.html","e31b075124e312df7ee27c7d0c897f0a"],["archives/2018/06/index.html","a6971f76b6dcda0cd143d191ffe83b77"],["archives/2018/07/index.html","e3994be90a188e046f831df63d878344"],["archives/2018/08/index.html","3b38c8cd62ee4a76f1346ad031398a57"],["archives/2018/12/index.html","2b71ab24517a40fff2d0c113e74201a2"],["archives/2018/index.html","e34fc12d74dd33cfca746aae8794fc53"],["archives/2018/page/2/index.html","7ed43caac4f9b493c4854b7b68eba9c9"],["archives/2018/page/3/index.html","6f3956e498c65f3c7a9797572598ac02"],["archives/2019/01/index.html","52337f38b90737aa1f0e47a95bebd49c"],["archives/2019/07/index.html","49226711bd643240bf9d3872542738b2"],["archives/2019/index.html","9d06556a19b13e98a928c3222318d9bf"],["archives/index.html","db7f123b77ac63b965b053e1d52011ab"],["archives/page/2/index.html","3cc3618754ef0b25ee525d87d2cb1627"],["archives/page/3/index.html","6195a64da887f9cb88be1cabcd6b7c85"],["archives/page/4/index.html","41cbf5f1849ba008e574fa20b8a3dd76"],["assets/css/APlayer.min.css","fbe994054426fadb2dff69d824c5c67a"],["assets/css/DPlayer.min.css","a04619266327f7509dcddcab9dbc63c2"],["assets/js/APlayer.min.js","8f1017e7a73737e631ff95fa51e4e7d7"],["assets/js/DPlayer.min.js","44523270fca2596186eabd047b3b04eb"],["assets/js/Meting.min.js","6a5d4f8e7f21a3a4aa2f9de994430379"],["categories/学习/index.html","d629be877eb852a1f6dde696940eacf4"],["categories/学习/page/2/index.html","9f189b5a22229a8e2c51cebde9c5d953"],["categories/学习/page/3/index.html","6e95b716f1b36a66b6906a86d880c038"],["categories/指弹/index.html","f633411e36e8417bafab1908de8acc78"],["categories/生活/index.html","a29c7a53611283778170a4f59b4636a0"],["css/default.css","e5e684d21cb02e9f7e81a2b722bddafc"],["css/donate.css","a68e4a34e814ce3334186286f4655440"],["css/style.css","fd93467f16ed22766d2e3acad963b90b"],["donate/index.html","03f6e342eee9cdf279e4baaa16f8874a"],["img/AliPayQR.png","1511d0c6f91582f2b7bf20d9b0956f87"],["img/BTCQR.png","a48f0b8d3aa8c07adbeffe2979b2e5a4"],["img/WeChatQR.png","8369323e99c4c96518e1297b47a71428"],["img/alipay.svg","9239702087add999b29eda6c69b7fac3"],["img/bitcoin.svg","73007d7f0ee6052c13edec23f0ee5c78"],["img/github.svg","23fc8f81f92bb2981d8f9e089d7df14a"],["img/like.svg","335eff6a0aefd9ce25d8624c9cae2f54"],["img/paypal.svg","96fa023e7e12051f7585b6fe4da53daf"],["img/wechat.svg","f9bcef76a75dae0e4fe6bf3d3af1cad3"],["index.html","7df3328f5658abe829a2c9a3cddeb850"],["js/codeblock-resizer.js","f70200751db2c1b3cff95884d7ecc132"],["js/donate.js","c5119c5bdd5049d805e03af774a47472"],["js/fancybox.js","7a432f63d671adfa0cb9a5458c6db4a8"],["js/gitment.browser.js","434949e3fa004587f73aada62910cfc4"],["js/search.js","2d82d5f1f7964cab86b4df17fcc946f9"],["js/share.js","013db0d5d1e2a227ac821fe8f0af678d"],["js/smartresize.js","14d842f8dea14c352b055b4e9de5cf07"],["js/totop.js","4ec0df4fc761d8a5433c8f0ba94750f7"],["live2d/assets/moc/wanko.1024/texture_00.png","10b7047251205db46fdac7632b5d4642"],["live2d/device.min.js","86a721c7735b03a0c12b172431e5cb2c"],["live2d/script.js","7d75535f43af497883c1b9a1b88c9e1a"],["page/2/index.html","a3bad4fc894c5d5e745388302dc59e09"],["page/3/index.html","d61c662ed531e891beca5bd3222aa011"],["page/4/index.html","f92e738cd4c8a5c362c1adb6be59fe13"],["tags/About/index.html","4901467055b4f5b8cd6cb42b97cb0b29"],["tags/Hexo/index.html","383f8c1d204966238f7faf458b65c5fc"],["tags/React-Native/index.html","719d7c34083af19b359a188944b0bb7f"],["tags/http/index.html","e23c24dc94c294229f596b15ec01aee2"],["tags/javascript/index.html","a729c5b23451e7c8d86408e3871ca763"],["tags/koa/index.html","23adccadcc53fa7adce2d9aa097e13e2"],["tags/react/index.html","4aa074cbba86459208f2c394dcf25fcd"],["tags/vue/index.html","6c9e1b164c6070d13d6039bd4fbf9449"],["tags/不知道归为哪一列系列/index.html","0ae7ba03b7786bfd56ce2c0f120377dc"],["tags/学习/index.html","8c62752900b0e03bb78158029d23fecf"],["tags/指弹/index.html","16afb2b8982b8beb75635c845445790f"],["tags/杂记/index.html","5b4339f2d045275d4081082e3458d8b1"],["tags/算法/index.html","275334002bd5feca32fa2fbdd54fca9b"],["youlian/index.html","9d04641a11005c857c3e095567e13f22"]];
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







