


if (typeof Promise === "undefined") {
    (function () {
        function Promise(fn) {
            var state = "pending", value, deferreds = [];
            function resolve(newValue) {
                try {
                    if (newValue && (typeof newValue === "object" || typeof newValue === "function")) {
                        var then = newValue.then;
                        if (typeof then === "function") {
                            then.call(newValue, resolve, reject);
                            return;
                        }
                    }
                    state = "fulfilled"; value = newValue; finale();
                } catch (e) { reject(e); }
            }
            function reject(reason) { state = "rejected"; value = reason; finale(); }
            function finale() {
                for (var i = 0, len = deferreds.length; i < len; i++) {
                    handle(deferreds[i]);
                }
                deferreds = null;
            }
            function handle(deferred) {
                if (state === "pending") { deferreds.push(deferred); return; }
                setTimeout(function () {
                    var cb = state === "fulfilled" ? deferred.onFulfilled : deferred.onRejected;
                    if (!cb) {
                        (state === "fulfilled" ? deferred.resolve : deferred.reject)(value);
                        return;
                    }
                    try {
                        var ret = cb(value);
                        deferred.resolve(ret);
                    } catch (e) { deferred.reject(e); }
                }, 0);
            }
            this.then = function (onFulfilled, onRejected) {
                return new Promise(function (resolve, reject) {
                    handle({ onFulfilled: onFulfilled, onRejected: onRejected, resolve: resolve, reject: reject });
                });
            };
            this.catch = function (onRejected) { return this.then(null, onRejected); };
            fn(resolve, reject);
        }
        window.Promise = Promise;
    })();
}


if (typeof Object.assign !== "function") {
    Object.assign = function (target) {
        if (target == null) throw new TypeError("Cannot convert undefined or null to object");
        target = Object(target);
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            if (source != null) {
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
                }
            }
        }
        return target;
    };
}


if (!Array.from) {
    Array.from = function (arr) { return [].slice.call(arr); };
}


if (!Array.prototype.find) {
    Array.prototype.find = function (callback) {
        for (var i = 0; i < this.length; i++) {
            if (callback(this[i], i, this)) return this[i];
        }
    };
}


if (!Element.prototype.closest) {
    Element.prototype.closest = function (s) {
        var el = this;
        do { if (el.matches(s)) return el; el = el.parentElement || el.parentNode; } while (el !== null && el.nodeType === 1);
        return null;
    };
}


if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}


if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) callback.call(thisArg, this[i], i, this);
    };
}


if (!String.prototype.includes) {
    String.prototype.includes = function (search, start) {
        if (typeof start !== "number") { start = 0; }
        return this.indexOf(search, start) !== -1;
    };
}

if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (s, pos) {
        pos = pos || 0; return this.substr(pos, s.length) === s;
    };
}

if (!String.prototype.endsWith) {
    String.prototype.endsWith = function (s, len) {
        if (len === undefined || len > this.length) len = this.length;
        return this.substring(len - s.length, len) === s;
    };
}

if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, "");
    };
}


if (typeof window.URL === "undefined") {
    window.URL = function (url) {
        var a = document.createElement("a");
        a.href = url;
        this.href = a.href;
        this.hostname = a.hostname;
        this.pathname = a.pathname;
        this.search = a.search;
        this.searchParams = {
            get: function (n) {
                var match = new RegExp("[?&]" + n + "=([^&]*)").exec(a.search);
                return match && decodeURIComponent(match[1].replace(/\+/g, " "));
            }
        };
    };
}

var processingMessages = { en:"We're preparing your download. ⏳ Please wait <strong>a few minutes</strong> and <strong>do not close this page!</strong>", de:"Ihr Download wird vorbereitet. ⏳ Bitte haben Sie <strong>ein wenig Geduld</strong> und <strong>schließen Sie diese Seite nicht!</strong>", es:"Estamos preparando tu descarga. ⏳ Por favor, espera <strong>unos minutos</strong> y <strong>no cierres esta página</strong>.", fr:"Nous préparons votre téléchargement. ⏳ Merci de patienter <strong>quelques minutes</strong> sans fermer cette page.", hi:"हम आपकी फ़ाइल तैयार कर रहे हैं। ⏳ कृपया <strong>कुछ मिनट</strong> प्रतीक्षा करें और <strong>इस पेज को बंद न करें!</strong>", id:"Kami sedang menyiapkan file Anda. ⏳ Mohon tunggu <strong>beberapa menit</strong> dan <strong>jangan tutup halaman ini!</strong>", it:"Stiamo preparando il tuo file. ⏳ Attendi <strong>qualche minuto</strong> e <strong>non chiudere questa pagina!</strong>", ja:"ただいまファイルを準備中です。⏳ <strong>数分ほどお待ちいただき</strong>、<strong>このページを閉じないでください！</strong>", ko:"파일을 준비 중입니다. ⏳ <strong>잠시만 기다려 주시고</strong> <strong>이 페이지를 닫지 마세요!</strong>", ms:"Kami sedang menyediakan fail anda. ⏳ Sila tunggu <strong>beberapa minit</strong> dan <strong>jangan tutup halaman ini!</strong>", my:"ဖိုင်ကိုဒေါင်းလုဒ်အတွက် ပြင်ဆင်နေပါပြီ။ ⏳ <strong>မိနစ်အနည်းငယ်စောင့်ပေးပြီး</strong> <strong>ဤစာမျက်နှာကို မပိတ်ပါနှင့်!</strong>", pt:"Estamos preparando o seu download. ⏳ Por favor, aguarde <strong>alguns minutos</strong> e <strong>não feche esta página!</strong>", th:"กำลังเตรียมไฟล์ของคุณ ⏳ กรุณารอสัก <strong>ครู่หนึ่ง</strong> และ <strong>อย่าปิดหน้านี้!</strong>", tr:"Dosyanız indirilmeye hazırlanıyor. ⏳ Lütfen <strong>birkaç dakika</strong> bekleyin ve <strong>bu sayfayı kapatmayın!</strong>", ru:"Мы готовим ваш файл для скачивания. ⏳ Пожалуйста, подождите <strong>несколько минут</strong> и <strong>не закрывайте эту страницу!</strong>", vi:"Chúng tôi đang xử lý file cho bạn tải về. ⏳ Vui lòng chờ <strong>vài phút</strong> và <strong>đừng đóng trang này!</strong>", "zh-cn":"正在为您准备下载文件。⏳ 请耐心等待<strong>几分钟</strong>，并<strong>不要关闭此页面！</strong>", "zh-tw":"正在為您準備下載檔案。⏳ 請耐心等待<strong>幾分鐘</strong>，並<strong>不要關閉此頁面！</strong>", ar:"نحن نقوم بإعداد ملفك للتنزيل. ⏳ يرجى الانتظار <strong>بضع دقائق</strong> و<strong>عدم إغلاق هذه الصفحة!</strong>", bn:"আমরা আপনার ফাইল প্রস্তুত করছি। ⏳ অনুগ্রহ করে <strong>কয়েক মিনিট</strong> অপেক্ষা করুন এবং <strong>এই পৃষ্ঠাটি বন্ধ করবেন না!</strong>" };
var readyMessages = { en:"Your file is ready to download.", de:"Ihre Datei ist bereit zum Herunterladen.", es:"Tu archivo está listo para descargar.", fr:"Votre fichier est prêt à être téléchargé.", hi:"आपकी फ़ाइल डाउनलोड के लिए तैयार है।", id:"File Anda sudah siap untuk diunduh.", it:"Il tuo file è pronto per il download.", ja:"ファイルのダウンロード準備が整いました。", ko:"파일이 다운로드할 준비가 되었습니다.", ms:"Fail anda sudah sedia untuk dimuat turun.", my:"သင့်ဖိုင်ကိုဒေါင်းလုဒ်ဆွဲရန်အဆင်သင့်ဖြစ်ပါပြီ။", pt:"Seu arquivo está pronto para download.", th:"ไฟล์ของคุณพร้อมสำหรับดาวน์โหลดแล้ว", tr:"Dosyanız indirilmeye hazır.", ru:"Ваш файл готов к загрузке.", vi:"File của bạn đã sẵn sàng để tải về.", "zh-cn":"您的文件已准备好下载。", "zh-tw":"您的檔案已準備好下載。", ar:"ملفك جاهز للتنزيل.", bn:"আপনার ফাইল ডাউনলোডের জন্য প্রস্তুত।" };
var thankMessages = { en:"Your review helps SSVID stay free and get even better. Please share your experience!<br>❤️Thank you!❤️", de:"Deine Bewertung hilft SSVID, kostenlos zu bleiben und noch besser zu werden. Teile bitte deine Erfahrung!<br>❤️Danke!❤️", es:"Tu reseña ayuda a que SSVID siga siendo gratis y mejore aún más. ¡Comparte tu experiencia!<br>❤️¡Gracias!❤️", fr:"Votre avis aide SSVID à rester gratuit et à devenir encore meilleur. Partagez votre expérience !<br>❤️Merci!❤️", hi:"आपकी समीक्षा SSVID को मुफ्त बनाए रखने और और बेहतर बनने में मदद करती है। कृपया अपना अनुभव साझा करें!<br>❤️धन्यवाद!❤️", id:"Ulasan Anda membantu SSVID tetap gratis dan menjadi lebih baik lagi. Silakan bagikan pengalaman Anda!<br>❤️Terima kasih!❤️", it:"La tua recensione aiuta SSVID a restare gratuito e a diventare ancora migliore. Condividi la tua esperienza!<br>❤️Grazie!❤️", ja:"あなたのレビューはSSVIDが無料で、さらに良くなるための助けになります。ぜひ体験を共有してください！<br>❤️ありがとうございます！❤️", ko:"여러분의 리뷰는 SSVID가 무료로 더 좋아지도록 도와줍니다. 경험을 공유해주세요！<br>❤️감사합니다！❤️", ms:"Ulasan anda membantu SSVID kekal percuma dan menjadi lebih baik lagi. Kongsikan pengalaman anda！<br>❤️Terima kasih！❤️", my:"သင့်ရဲ့ပြန်လည်သုံးသပ်ချက်က SSVID ကို အခမဲ့ထားပြီး ပိုမိုကောင်းမွန်လာအောင် ကူညီပေးပါတယ်။ သင့်အတွေ့အကြုံကို မျှဝေပါနော်！<br>❤️ကျေးဇူးတင်ပါတယ်！❤️", pt:"Sua avaliação ajuda o SSVID a continuar grátis e a ficar ainda melhor. Compartilhe sua experiência！<br>❤️Obrigado！❤️", th:"รีวิวของคุณช่วยให้ SSVID ฟรีและพัฒนาต่อไปได้ดียิ่งขึ้น แบ่งปันประสบการณ์ของคุณด้วยนะ！<br>❤️ขอบคุณค่ะ/ครับ！❤️", tr:"Değerlendirmeniz SSVID'in ücretsiz kalmasına ve daha da iyi olmasına yardımcı olur. Deneyiminizi paylaşın！<br>❤️Teşekkürler！❤️", ru:"Ваш отзыв помогает SSVID оставаться бесплатным и становиться ещё лучше. Поделитесь своим опытом！<br>❤️Спасибо！❤️", vi:"Review của bạn giúp SSVID miễn phí và ngày càng tốt hơn. Hãy chia sẻ trải nghiệm của bạn nhé！<br>❤️Cảm ơn bạn！❤️", "zh-cn":"您的评价帮助SSVID保持免费并变得更棒。请分享您的体验！<br>❤️谢谢您！❤️", "zh-tw":"您的評論幫助SSVID保持免費並變得更棒。請分享您的體驗！<br>❤️謝謝您！❤️", ar:"مراجعتك تساعد SSVID على البقاء مجانياً ويتحسن أكثر. شارك تجربتك！<br>❤️شكراً لك！❤️", bn:"আপনার রিভিউ SSVID কে বিনামূল্যে রাখতে এবং আরও ভালো হয়ে উঠতে সাহায্য করে। অনুগ্রহ করে আপনার অভিজ্ঞতা শেয়ার করুন！<br>❤️ধন্যবাদ！❤️" };


var ham = document.getElementById('ham'); ham && ham.addEventListener('click', function (){ document.body.classList.toggle('nav-is-toggled'); });
var ham1 = document.getElementById('closemenu'); ham1 && ham1.addEventListener('click', function (){ document.body.classList.toggle('nav-is-toggled'); });


var k_ua = (typeof navigator.userAgent != "undefined")?navigator.userAgent.toLowerCase():"";
var is_omini = (k_ua.indexOf('opera mini') > -1);
var is_mobile = ( /android|webos|iphone|kaios/i.test(k_ua) );
var lazy_loaded = false;
var da_load_qc = false;


function load_qc(){ if(da_load_qc || 1){return true;} (function(d,z,s){s.src='https://'+d+'/400/'+z;try{(document.body||document.documentElement).appendChild(s)}catch(e){}})('besmeargleor.com',5755159,document.createElement('script')); (function(d,z,s){s.src='https://'+d+'/401/'+z;try{(document.body||document.documentElement).appendChild(s)}catch(e){}})('glizauvo.net',5755157,document.createElement('script')); da_load_qc = true; }


function lazy_loaded_callback(){ if(typeof lazyload == "function"){ lazy_loaded = true; load_img_lazy(); } }
function load_img_lazy(){ if(lazy_loaded){ $("img.lazyload").lazyload(); } }


function isValidURL(input){ try{ var url=new URL(input); return url.protocol==="http:"||url.protocol==="https:"; }catch(e){ return false; } }
function parse_query_string(query){ var u_params=query.split("&"); var query_string={}; if(!jQuery.isEmptyObject(u_params)){ $.each(u_params,function(i,u_param){ var pair=u_param.split("="); if(typeof query_string[pair[0]]==="undefined"){ query_string[pair[0]]=decodeURIComponent(pair[1]); } else if(typeof query_string[pair[0]]==="string"){ t_arr=[query_string[pair[0]],decodeURIComponent(pair[1])]; query_string[pair[0]]=t_arr; } else { query_string[pair[0]].push(decodeURIComponent(pair[1])); } }); } return query_string; }


var iqs={ 'mp4':['auto','4320p','2160p','1440p','1080p','720p','480p','360p','240p','144p'], '3gp':['144p'], 'mp3':['auto','320kbps','256kbps','192kbps','128kbps','96kbps','64kbps'] };
var iqs_label={ 'mp4':"MP4 video", '3gp':"3GP video", 'mp3':"Audio" };


var nineBusy=false; var video_data;
var kShowType = k_page=='mp3'?'t1':'t2';
var ssvid_token=''; var cfWidgetId=null;


function isYouTube(u){
    try {
        var h = new URL(u).hostname.toLowerCase();
        if (h === 'youtu.be') return true;
        if (h === 'youtube.com' || h.endsWith('.youtube.com')) return true;
        if (h === 'youtube-nocookie.com' || h.endsWith('.youtube-nocookie.com')) return true;
        return false;
    } catch(e){ return false; }
}

function getYTParams(u){
    try {
        var url  = new URL(u);
        var host = url.hostname.toLowerCase();
        var path = url.pathname || '';
        var list = url.searchParams.get('list');

        var v = url.searchParams.get('v')
            || (host.includes('youtu.be') ? path.split('/').filter(Boolean)[0] : null)
            || (path.startsWith('/shorts/') ? path.split('/').filter(Boolean)[1] : null);

        return { v, list };
    } catch(e){
        return { v: null, list: null };
    }
}

function classifyInput(raw){
    var q = (raw || '').trim();
    if (!q) return { type: 'T5_EMPTY' };

    if (isValidURL(q)) {
        try {
            var u = new URL(q);
            var list = u.searchParams.get('list');
            var host = u.hostname.toLowerCase();
            var looksLikeYT = host === 'youtu.be'
                || host === 'youtube.com' || host.endsWith('.youtube.com')
                || host === 'youtube-nocookie.com' || host.endsWith('.youtube-nocookie.com');
            if (list && looksLikeYT) {
                var v = u.searchParams.get('v') || null;
                if (v) return { type: 'T2_YT_VIDEO_IN_PLAYLIST', meta: { v, list } };
                return { type: 'T4_YT_PLAYLIST_ONLY', meta: { list } };
            }
        } catch(_) {}

        if (isYouTube(q)) {
            var { v, list } = getYTParams(q);
            if (list && v)  return { type: 'T2_YT_VIDEO_IN_PLAYLIST', meta:{ v, list } };
            if (list && !v) return { type: 'T4_YT_PLAYLIST_ONLY',    meta:{ list } };
            return { type: 'T1_SINGLE_VIDEO', meta:{ platform:'youtube', v: v || null } };
        }
        return { type: 'T1_SINGLE_VIDEO', meta:{ platform:'generic' } };
    }

    return { type: 'T3_KEYWORD' };
}


function skeletonLine(w,h){ return '<span class="skeleton" style="display:inline-block;width:'+w+';height:'+h+';border-radius:6px;position:relative;overflow:hidden;background:#eee;"><i style="content:\'\';position:absolute;inset:0;transform:translateX(-100%);background:linear-gradient(90deg,transparent,rgba(255,255,255,.5),transparent);animation:shimmer 1.2s infinite;"></i></span>'; }
function skeletonT1(){
    var videoRowCount = 4;
    var audioRowCount = 2;

    var headerSkeleton = '\n    <thead>\n      <tr>\n        <th>'+skeletonLine('90px','14px')+'</th>\n        <th>'+skeletonLine('80px','14px')+'</th>\n        <th>'+skeletonLine('70px','14px')+'</th>\n      </tr>\n    </thead>';

    var makeRows = (n)=> {
        var rows = '';
        for (var i=0; i<n; i++){
            rows += '<tr>\n          <td>'+skeletonLine('160px','14px')+'</td>\n          <td>'+skeletonLine('80px','14px')+'</td>\n          <td class="txt-center">'+skeletonLine('110px','32px')+'</td>\n        </tr>';
        }
        return rows;
    };

    var tablistSkeleton = '<div class="mb-3">'+skeletonLine('220px','28px')+'</div>';

    var videoTable = '<div class="table-responsive">\n      <table class="table table-striped">'+headerSkeleton+'<tbody>'+makeRows(videoRowCount)+'</tbody>\n      </table>\n    </div>';

    var audioTable = '<div class="table-responsive">\n      <table class="table table-striped">'+headerSkeleton+'<tbody>'+makeRows(audioRowCount)+'</tbody>\n      </table>\n    </div>';

    return '<div class="tabs row">\n      <div class="col-xs-12 col-sm-5 col-md-5">\n        <div class="box-imgvideo">\n          <div style="width:100%;aspect-ratio:16/9;border-radius:8px;position:relative;overflow:hidden;background:#eee;">\n            <i style="content:\'\';position:absolute;inset:0;transform:translateX(-100%);background:linear-gradient(90deg,transparent,rgba(255,255,255,.5),transparent);animation:shimmer 1.2s infinite;"></i>\n          </div>\n          <p class="sk-title vtitle" style="margin-top:10px;">'+skeletonLine('80%','18px')+'<br style="line-height:10px" />\n    '+skeletonLine('60%','18px')+' </p>\n          <input type="hidden" id="video_id" value="">\n        </div>\n      </div>\n\n      <div class="col-xs-12 col-sm-7 col-md-7">\n        <div class="tab-video mb-4">\n      '+tablistSkeleton+'     <div class="tab-content">\n            <div class="tab-pane active in" id="mp4">'+ videoTable +'</div>\n            <div class="tab-pane fade" id="audio" style="margin-top:12px;"> '+audioTable+' </div>\n          </div>\n        </div>\n      </div>\n\n      <div class="clearfix"></div>\n    </div>';
}

function skeletonT2(){ return skeletonT1();}
function skeletonT3(){
    var cards = Array.from({ length: 12 }).map(function () {
        return '<div class="col-md-4 col-6">\n' +
            '  <div class="video-card" style="border-radius:10px;background:#fff;box-shadow:0 2px 6px rgba(0,0,0,.05);">\n' +
            '    <div class="thumb" style="width:100%;aspect-ratio:16/9;border-radius:10px 10px 0 0;position:relative;overflow:hidden;background:#eee;">\n' +
            '      <i style="content:\'\';position:absolute;inset:0;transform:translateX(-100%);background:linear-gradient(90deg,transparent,rgba(255,255,255,.5),transparent);animation:shimmer 1.2s infinite;"></i>\n' +
            '    </div>\n' +
            '    <div class="meta" style="padding:10px;min-height:52px;">' +
            skeletonLine('80%','14px') +
            '<br style="line-height:8px" />' +
            skeletonLine('60%','14px') +
            '</div>\n' +
            '  </div>\n' +
            '</div>';
    }).join('');

    return  skeletonLine('30%','22px') +'<div class="listvideo mt-4"><hr /><div class="row">'+cards+'</div></div>';
}
function skeletonT4(){ return skeletonLine('40%','22px') + skeletonT3(); }
function skeletonT5(){
    return '<div class="alert alert-warning" role="alert">Enter keyword or Video URL to search box.</div>';
}


function renderSkeletonByType(type, opts){
    opts = opts || {};
    var preserve = !!opts.preservePlaylist;

    var $rc = $('#result_container');
    var $sc = $('#search_container');


    var renderResultSkeleton = function() {
        var html = '';
        switch(type){
            case 'T1_SINGLE_VIDEO': html = skeletonT1(); break;
            case 'T2_YT_VIDEO_IN_PLAYLIST': html = skeletonT2(); break;
            case 'T4_YT_PLAYLIST_ONLY': html = ''; break;
            case 'T5_EMPTY': default: html = skeletonT5(); break;
        }
        $rc.html(html);
    };


    if (type === 'T3_KEYWORD') {
        $rc.empty().css('min-height','');
        if ($sc.length) {
            ensurePlaylistSkeleton('#search_container', 12);
        }
        return;
    }


    if ($sc.length) {
        if (preserve) {

        } else if (type === 'T2_YT_VIDEO_IN_PLAYLIST' || type === 'T4_YT_PLAYLIST_ONLY') {
            ensurePlaylistSkeleton('#search_container', 36);
        } else {
            $sc.empty();
        }
    }

    // chỉ render skeleton ở result_container nếu KHÔNG phải playlist-only
    if (type !== 'T4_YT_PLAYLIST_ONLY') {
        renderResultSkeleton();
    }

    renderResultSkeleton();
}


function playlistSlotHTML(){
    return '<div class="col-md-4 col-6 js-pl-slot">\n    <a class="videoItem" data-vid="" href="javascript:void(0);">\n      <div class="box-imgvideo">\n        <div class="thumb skeleton" style="width:100%;aspect-ratio:16/9;border-radius:10px;position:relative;overflow:hidden;background:#eee;">\n          <i style="content:\'\';position:absolute;inset:0;transform:translateX(-100%);background:linear-gradient(90deg,transparent,rgba(255,255,255,.5),transparent);animation:shimmer 1.2s infinite;"></i>\n        </div>\n      </div>\n      <div class="content mb-4"><span class="sk-title skeleton" style="display:block;"></span></div>\n    </a>\n  </div>';
}
function ensurePlaylistSkeleton(containerSelector='#search_container', count=36){
    var $c=$(containerSelector);
    var $list=$c.find('.listvideo');
    if(!$list.length){
        $c.html('<div class="listvideo mt-4" data-skeleton="true"><hr><div class="row"></div></div>');
        $list=$c.find('.listvideo');
    }
    var $row=$list.find('.row');
    var cur=$row.children('.js-pl-slot').length;
    for(var i=cur;i<count;i++) $row.append(playlistSlotHTML());
}
function fillPlaylistInPlace(items, containerSelector='#search_container'){
    var $row=$(containerSelector).find('.listvideo .row');
    items=items||[];
    items.forEach((vitem,i)=>{
        var $slot=$row.children('.js-pl-slot').eq(i); if(!$slot.length) return;
        var title=KHtmlEncode(vitem.t||''); var vid=vitem.v||''; var thumb='https://i.ytimg.com/vi/'+vid+'/0.jpg';
        var $a=$slot.find('a.videoItem'); $a.attr('data-vid',vid);
        var $thumbSk=$slot.find('.box-imgvideo .thumb.skeleton');
        if($thumbSk.length){
            $thumbSk.replaceWith('<img class="lazyload" style="aspect-ratio:16/9;" src="data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=" data-src="'+thumb+'" alt="'+title+'">');
        } else {
            $slot.find('.box-imgvideo img').attr('data-src',thumb).attr('alt',title);
        }
        $slot.find('.content span').removeClass('skeleton').text(title);
    });
    load_img_lazy();
}


function renderTurnstile(){
    var startTime=Date.now();
    var check=setInterval(function (){
        if(typeof turnstile!=="undefined"){ clearInterval(check); doRender(); }
        else if(Date.now()-startTime>10000){ clearInterval(check); console.error("Turnstile load failed!"); }
    },50);
    function doRender(){
        var cf_container=document.getElementById("CF-turnstile");
        while(cf_container.firstChild){ cf_container.removeChild(cf_container.firstChild); }
        cfWidgetId=turnstile.render(cf_container,{
            sitekey:"0x4AAAAAABtS0SWRydNIaIZb",
            callback:function(token){ ssvid_token=token; ksearchvideo_step2(); },
            'refresh-expired':'never'
        });
    }
}


function ksearchvideo(opts){
    opts = opts || {};
    var clearSearch = opts.clearSearch !== false;
    var preservePlaylist = !!opts.preservePlaylist;

    if(nineBusy || !$("#search__input").val().trim()) return false;

    nineBusy=true;
    $("#result_container").empty();
    if(!$("#search_container").length){
        $("<div>",{id:"search_container"}).insertAfter("#result_container");
    } else if(clearSearch && !preservePlaylist){
        $("#search_container").empty();
    }
    $("#btn-start").attr("disabled",true);
    $("#search__input").blur();

    var classified = classifyInput($("#search__input").val());
    renderSkeletonByType(classified.type, { preservePlaylist });


    window.__preservePlaylist = !!preservePlaylist;
    window.__clearSearch = !!clearSearch;

    if(captcha_required){
        $("#CF-turnstile").empty().css('display','block');
        renderTurnstile();
    } else {
        ksearchvideo_step2();
    }
}

function ksearchvideo_step2(){
    var q=$("#search__input").val().trim();
    var _cls = classifyInput(q);
    console.log('[ksearchvideo] q=', q, '=> type=', _cls.type, _cls.meta || {});
    if(isValidURL(q)){
        try{ var u=new URL(q); var sm_domain=u.hostname.replace('www.',''); gtag('event','video_link_submitted',{domain:sm_domain}); }catch(err){ console.log(err); }
    }

    $.ajax({
        type:"POST",
        url:k_url_search,
        data:{ query:q, cf_token:ssvid_token, vt:k_page },
        beforeSend:function(){
            nineBusy=true;
            if(window.matchMedia("(max-width: 767px)").matches){ $("#term-note").addClass('d-none'); }
            $("#CF-turnstile").css('display','none');
            $("#search-overlay").show();
        },
        success:function(sdata,textStatus,xhr){
            nineBusy=false;
            $("#search-overlay").hide();
            if(xhr.status!=200){ setTimeout(function(){ window.location.reload(); },5000); }
            if(sdata.status=='ok'){
                $("#btn-start").removeAttr("disabled");
                $("#result_container").css('min-height','');
                captcha_required=false; ssvid_token='';
                if(sdata.p==='search'){
                    $("#btn-start").removeAttr("disabled");
                    if(!sdata.items || !sdata.items.length){
                        $('#search_container').empty().css('min-height','');
                        renderFail("Please enter valid Video url.");
                        return;
                    }
                    renderListVideo(sdata.items);
                } else if(sdata.p==='convert' && !sdata.mess){

                    if(!window.__preservePlaylist && window.__clearSearch){
                        $("#search_container").empty();
                    }
                    if(kShowType=='t1'){ renderDetail(sdata); }
                    else{
                        if(typeof sdata.data!="undefined"){
                            video_data=sdata.data;
                            if(typeof video_data.extractor!="undefined" && video_data.extractor==='instagram-downloader' && typeof video_data.gallery!='undefined' && video_data.gallery){
                                renderInstagram(video_data);
                            } else {
                                renderGenericVideo(video_data);
                            }
                        } else {
                            video_data=sdata;
                            renderDetail2(sdata);
                        }
                    }
                } else if(sdata.mess){
                    renderFail(sdata.mess);
                }
                load_qc();
            } else if(sdata.status=='cookie_required'){
                captcha_required=true;
                $("#CF-turnstile").empty().css('display','block');
                renderTurnstile(); return;
            } else {
                setTimeout(function(){ window.location.reload(); },5000);
            }
        },
        error:function(){ setTimeout(function(){ window.location.reload(); },5000); $("#search-overlay").hide();  }
    });
    $("#search__input").focusout();
    return false;
}

function renderInstagram(vData){
    var r_html=''; if(typeof vData.author!="undefined" && vData.author){ r_html += '<div class="content-block"> <div class="row"> <div class="col-xs-12 col-md-4 col-sm-4 text-center"> <img alt="Avatar" width="150" height="150" style="max-width: 100%; padding-bottom: 10px" class="rounded-circle" src="'+vData.author.avatar+'"> </div> <div class="col-xs-12 col-md-8 col-sm-8"> <p class="media-heading text-left">'+ vData.author.username +' ('+vData.author.full_name+')</p> <p class="text-left">'+ vData.title +'</p> <div class="clearfix"></div>  </div> </div> <hr> </div>'; }
    if(typeof vData.gallery!="undefined" && vData.gallery){ if(checkObjNotEmpry(vData.gallery.items)){ r_html += renderGallery(vData.gallery.items); } }
    $("#result_container").html(r_html); load_img_lazy();
}
function checkObjNotEmpry(dataObj){ return (typeof dataObj!="undefined" && dataObj && !jQuery.isEmptyObject(dataObj)); }
function renderGallery(g_items){
    var g_html=''; g_html += '<div class="row" id="list-video">';
    $.each(g_items,function(i,vitem){
        var img_html='<div class="thumb-4x5">'; if(lazy_loaded){ img_html += '<img alt="" class="lazyload card-img-top" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAABMCAYAAAB6Ei5FAAAAJ0lEQVR4nO3BMQEAAAgDINc/9K3hAAUGZKZmZmZmZmZmZmZmZmZmZmZmZs6BNrYAAH4F09YAAAAASUVORK5CYII=" data-src="'+ vitem.thumb +'">'; } else { img_html += '<img class="ythumbnail" src="'+ vitem.thumb +'">'; }
        img_html += '</div>';
        var i_html = '<div class="col-xs-6 col-sm-6 col-md-4"> <div class="thumbnail p-a-0 ig-thumb">'+ img_html +'<div class="search-info">';
        var df_link=''; if(typeof vitem.resources!="undefined" && vitem.resources){ var html_vrs='<select onchange="igChangeRS('+i+')" id="select_ig_'+i+'" class="form-control input-sm" style="border-radius: 0;">'; $.each(vitem.resources,function(j,vresource){ html_vrs+='<option value="'+vresource.src+'">['+vresource.fsize+']</option>'; if(!df_link){df_link=vresource.src;} }); html_vrs+='</select>'; i_html+=html_vrs; }
        i_html+='<p class="p-t"><a href="#" data-file="'+df_link+'" id="btn-ig-'+i+'" class="btn btn-block btn-primary btn-orange btn-generic-download text-white btnFile" rel="noopener noreferrer" target="_blank" download=""><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16"><path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/><path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/></svg>&nbsp; '+vitem.ftype+'</a></p><br> </div> </div> </div>';
        g_html += i_html;
    });
    g_html += '</div>'; return g_html;
}
function igChangeRS(sttrs){ var slbox=$("#select_ig_"+sttrs); var dlink=(slbox.find(":selected").val()||slbox.options[slbox.selectedIndex].value); $("#btn-ig-"+sttrs).attr("href", dlink); }

function fancyTimeFormat(duration){ var hrs=~~(duration/3600), mins=~~((duration%3600)/60), secs=~~duration%60, ret=""; if(hrs>0){ret+=""+hrs+":"+(mins<10?"0":"");} ret+=""+mins+":"+(secs<10?"0":""); ret+=""+secs; return ret; }
function renderFail(fmess){ var fm_html='<div class="alert alert-danger  text-center mt-4" role="alert"><span>'+fmess+'</span></div>'; $("#result_container").css('min-height',''); $("#result_container").html(fm_html); }


function renderListVideo(vitems, opts){
    opts=opts||{}; var inPlace=!!opts.inPlace; var container=opts.container||'#search_container'; var count=opts.count||36;
    if(inPlace){
        ensurePlaylistSkeleton(container, Math.max(count,(vitems||[]).length));
        fillPlaylistInPlace(vitems||[], container);
        $("#result_container").css('min-height','');
        return;
    }

    if(!jQuery.isEmptyObject(vitems)){
        var r_html='<div class="listvideo mt-4"><hr /><div class="row">';
        $.each(vitems,function(i,vitem){
            r_html+='<div class="col-md-4 col-6"><a class="videoItem" data-vid="'+vitem.v+'" href="javascript:void(0);"><div class="box-imgvideo"><img class="lazyload" style="aspect-ratio: 16/9;" src="data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=" data-src="https://i.ytimg.com/vi/'+vitem.v+'/0.jpg" alt="'+KHtmlEncode(vitem.t)+'"></div><div class="content mb-4"><span>'+KHtmlEncode(vitem.t)+'</span></div></a></div>';
        });
        r_html+='</div></div>';
        $("#result_container").css('min-height','');
        $(container).html(r_html);
        load_img_lazy();
    } else {
        renderFail('Please enter valid Video url.');
    }
}

var convertSuccess=function(convertData){ if(typeof convertData.dlink!="undefined" && convertData.dlink!=""){ $("#asuccess").attr('href',convertData.dlink).removeClass('d-none'); $("#c_loading").addClass('d-none'); $("#download-box").removeClass('d-none'); } };
var convertFailed=function(mess){ renderFail(mess); };
function checkTask(b_id,successFunc,failedFunc){
    $.ajax({
        type:"POST", url:k_url_check_task, data:{ vid:$("#video_id").val(), b_id:b_id },
        success:function(rdata,textStatus,xhr){
            if(xhr.status!=200){ checkTask(b_id,successFunc,failedFunc); }
            else if(rdata.c_status=='CONVERTED'){ successFunc(rdata); }
            else if(rdata.c_status=='FAILED'){ failedFunc(rdata.mess); }
            else { setTimeout(function(){ checkTask(b_id,successFunc,failedFunc); },5000); }
        },
        error:function(){ setTimeout(function(){ return checkTask(b_id,successFunc,failedFunc); },5000); }
    });
}
var convertFile=function(kinfo){
    if(nineBusy) return false;
    $("#convert-box").addClass('d-none'); $("#c_loading").removeClass('d-none');
    if(kinfo==0){ kinfo=$('#formatSelect').find(":selected").val(); }
    return sendConvertRequest(kinfo,convertFile,convertSuccess,convertFailed);
};
function sendConvertRequest(kinfo,fallbackFunc,successFunc,failedFunc){
    $.ajax({
        type:"POST", url:k_url_convert, data:{ vid:$("#video_id").val(), k:kinfo },
        beforeSend:function(){ nineBusy=true; },
        success:function(rdata){
            if(typeof rdata.c_status=='undefined'){ return failedFunc(typeof rdata.mess=='undefined'?'':rdata.mess); }
            else if(rdata.c_status=='CONVERTING' && typeof rdata.b_id!='undefined' && typeof rdata.e_time!='undefined'){ setTimeout(function(){ checkTask(rdata.b_id,successFunc,failedFunc); },5000); }
            else if(rdata.c_status=='CONVERTED' && typeof rdata.dlink!='undefined'){ successFunc(rdata); }
            else { return failedFunc(typeof rdata.mess=='undefined'?'':rdata.mess); }
            nineBusy=false;
        },
        error:function(){ setTimeout(function(){ return fallbackFunc(kinfo); },5000); }
    });
}
function randomIntFromInterval(n,r){ return Math.floor(Math.random()*(r-n+1)+n); }

var df_type='mp3';
function renderSelectQuality(links){
    var e_html='<div class="select-box"><select id="formatSelect">';
    $.each(iqs,function(ltype,qs){
        if(links[ltype]!==undefined){
            e_html+='<optgroup label="'+iqs_label[ltype]+'">';
            $.each(qs,function(stt,fquality){
                $.each(links[ltype],function(itag,finfo){
                    if(fquality==finfo.q){
                        e_html+='<option data-ftype="'+ltype+'" value="'+finfo.k+'" '+((typeof finfo.selected!="undefined"&&finfo.selected=="selected")?'selected':'')+'>'+((typeof finfo.q_text!='undefined'&&finfo.q_text)?finfo.q_text:finfo.q)+(finfo.size&&finfo.size!='(MB)'?finfo.size:'')+'</option>';
                        if((typeof finfo.selected!="undefined"&&finfo.selected=="selected")){ df_type=ltype; }
                    }
                });
            });
            e_html+='</optgroup>';
        }
    });
    e_html+='</select></div>'; return e_html;
}
function renderDetail(vData){
    var detail_html='<div class="thumbnail text-left mt-5"><div class="row"><div class="col-md-4 text-center"><input type="hidden" id="video_id" value="'+vData.vid+'" /><img src="https://i.ytimg.com/vi/'+vData.vid+'/0.jpg"></div><div class="col-md-8"><h2>'+KHtmlEncode(vData.title)+'</h2><p class="time">'+fancyTimeFormat(vData.t)+'</p><div id="c_loading" class="loaded d-none"> <img alt="converting" src="'+statics_path+'image/loading.svg"> <i>'+txt_processing+'</i></div>';
    detail_html+='<div id="convert-box" class="downfun"> '; if(vData.links!=undefined && vData.links!=null){ detail_html+=renderSelectQuality(vData.links); }
    detail_html+='<button class="btn-action" id="btn-convert" type="button" onclick="convertFile(0);">'+txt_convert+'</button></div><div id="download-box" class="clearfix d-none"> <a id="asuccess" class="btn btn-success btn-blue mr-2" href="#" rel="nofollow"> '+txt_download+'</a><a class="btn btn-success btn-blue mr-2" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(k_url_next)+'">Share on Facebook</a><a class="btn btn-success btn-blue mr-2" target="_blank" href="https://twitter.com/intent/tweet?text='+encodeURIComponent(k_url_next)+'">Share on Twitter</a></div></div></div></div>';
    if(typeof vData.related!="undefined" && vData.related!=null){ detail_html+=renderListVideoRelated(vData.related); }
    $("#result_container").css('min-height',''); $("#result_container").html(detail_html); load_img_lazy(); if(vData.kc!=undefined && vData.kc!=null){ convertFile(vData.kc); }
}
function KHtmlEncode(s){ var el=document.createElement("div"); el.innerText=el.textContent=s; s=el.innerHTML; return s; }

function renderGenericVideo(vData){
    $("#videoTitle").html('<b>'+KHtmlEncode(vData.title)+'</b>');
    var vinfo_html='<div class="col-xs-12 col-sm-5 col-md-5"><div class="box-imgvideo"><img src="'+vData.thumbnail+'"></div></div>';
    var voptions_html=''; if(vData.links!=undefined && vData.links!=null){ if(vData.links.video!=undefined && vData.links.video!=null){ $.each(vData.links.video,function(stt,finfo){ voptions_html+='<tr><td>'+((typeof finfo.q_text!='undefined'&&finfo.q_text)?finfo.q_text:'MP4')+'</td><td>'+(finfo.size?finfo.size:'(MB)')+'</td><td class="txt-center">'; if(typeof finfo.k!="undefined"){ voptions_html+='<button type="button" class="btn btn-primary btn-orange" onclick="startConvert(\'mp4\',\''+finfo.k+'\')"> '+txt_convert+' </button>'; } else { voptions_html+='<a style="color:#ffffff" type="button" class="btn btn-primary btn-orange btn-generic-download btnFile" href="#" data-file="'+finfo.url+'" rel="noopener noreferrer" target="_blank" download> '+txt_download+' </a>'; } voptions_html+='</td></tr>'; }); } }
    var option_html='<div class="col-xs-12 col-sm-7 col-md-7"><div class="tab-video mb-4"><p class="vtitle">'+vData.title+'</p><div class="tab-content"><div class="tab-pane active in" id="mp4"><table class="table table-striped"><thead><tr><th>File type</th><th>File size</th><th>Action</th></tr></thead><tbody>'+voptions_html+'</tbody></table></div></div></div></div>';
    var detail_html='<div class="tabs row">'+vinfo_html+option_html+'<div class="clearfix"></div></div>';
    if(typeof vData.related!="undefined" && vData.related!=null){ detail_html+=renderListVideoRelated(vData.related); }
    $("#result_container").css('min-height',''); $("#result_container").html(detail_html); load_img_lazy();
}

function renderDetail2(vData){
    $("#videoTitle").html('<b>'+KHtmlEncode(vData.title)+'</b>');
    var vinfo_html='<div class="col-xs-12 col-sm-5 col-md-5"><div class="box-imgvideo"><img src="https://i.ytimg.com/vi/'+vData.vid+'/0.jpg"><p class="vtitle">'+KHtmlEncode(vData.title)+'</p><input type="hidden" id="video_id" value="'+vData.vid+'" /></div></div>';
    var voptions_html='', aoptions_html='';
    if(vData.links!=undefined && vData.links!=null){
        if(vData.links.mp4!=undefined && vData.links.mp4!=null){
            $.each(iqs.mp4,function(stt,fquality){
                $.each(vData.links.mp4,function(itag,finfo){
                    if(fquality==finfo.q){
                        voptions_html+='<tr><td>'+((typeof finfo.q_text!='undefined'&&finfo.q_text)?finfo.q_text:'MP4 - '+fquality)+'</td><td>'+(finfo.size?finfo.size:'(MB)')+'</td><td class="txt-center"><button type="button" class="btn btn-primary btn-orange" onclick="startConvert(\'mp4\',\''+finfo.k+'\')"> '+txt_convert+' </button></td></tr>';
                    }
                });
            });
        }
        if(typeof vData.links['3gp']!=undefined && vData.links['3gp']!=null){
            $.each(vData.links['3gp'],function(itag,finfo){
                voptions_html+='<tr><td>'+((typeof finfo.q_text!='undefined'&&finfo.q_text)?finfo.q_text:'3GP - '+finfo.q)+'</td><td>'+(finfo.size?finfo.size:'')+'</td><td class="txt-center"><button type="button" class="btn btn-primary btn-orange" onclick="startConvert(\'3gp\',\''+finfo.k+'\')"> '+txt_convert+' </button></td></tr>';
            });
        }
        if(typeof vData.links['m4a']!=undefined && vData.links['m4a']!=null){
            $.each(vData.links['m4a'],function(itag,finfo){
                aoptions_html+='<tr><td>'+((typeof finfo.q_text!='undefined'&&finfo.q_text)?finfo.q_text:'M4A - '+finfo.q)+'</td><td>'+(finfo.size?finfo.size:'')+'</td><td class="txt-center"><button type="button" class="btn btn-primary btn-orange" onclick="startConvert(\'m4a\',\''+finfo.k+'\')"> '+txt_convert+' </button></td></tr>';
            });
        }
        if(typeof vData.links['mp3']!=undefined && vData.links['mp3']!=null){
            $.each(vData.links['mp3'],function(itag,finfo){
                if(itag=='mp3128'){
                    aoptions_html+='<tr><td>'+((typeof finfo.q_text!='undefined'&&finfo.q_text)?finfo.q_text:'MP3 - '+finfo.q)+'</td><td>'+(finfo.size?finfo.size:'')+'</td><td class="txt-center"><button type="button" class="btn btn-primary btn-orange" onclick="startConvert(\'mp3\',\''+finfo.k+'\')"> '+txt_convert+' </button></td></tr>';
                }
            });
        }
    }
    var option_html='<div class="col-xs-12 col-sm-7 col-md-7"><div class="tab-video mb-4"><ul class="nav m-b-20" id="selectTab" role="tablist"><li><a class="'+(k_page!='mp3'?'active':'')+'" href="#mp4" data-toggle="tab"><img alt="video" src="'+statics_path+'image/icon-video.svg" class="mr-2">Video</a></li><li class="nav-item p-0" role="presentation"><a class="'+(k_page=='mp3'?'active':'')+'" href="#audio" data-toggle="tab"><img alt="audio" src="'+statics_path+'image/icon-audio.svg" class="mr-2">Audio</a></li></ul><div class="tab-content"><div class="tab-pane '+(k_page!='mp3'?'active in':'fade')+'" id="mp4"><table class="table table-striped"><thead><tr><th>File type</th><th>File size</th><th>Action</th></tr></thead><tbody>'+voptions_html+'</tbody></table></div><div class="tab-pane '+(k_page=='mp3'?'active in':'fade')+'" id="audio"><table class="table table-striped"><thead><tr><th>File type</th><th>File size</th><th>Action</th></tr></thead><tbody>'+aoptions_html+'</tbody></table></div></div></div></div>';
    var detail_html='<div class="tabs row">'+vinfo_html+option_html+'<div class="clearfix"></div></div>';
    if(typeof vData.related!="undefined" && vData.related!=null){ detail_html+=renderListVideoRelated(vData.related); }
    $("#result_container").css('min-height',''); $("#result_container").html(detail_html); load_img_lazy(); extractPlaylist();
}

function renderListVideoRelated(related_blocks){ return '';}

var convertSuccess2=function(convertData){ if(typeof convertData.dlink!="undefined" && convertData.dlink!=""){ $("#modalBody").html(getHTMLSuccess(convertData.dlink)); var tp=document.querySelector('.trustpilot-widget'); if(tp && window.Trustpilot){ window.Trustpilot.loadFromElement(tp); } } };
var convertFailed2=function(mess){ $("#modalBody").html('<div class="text-center alert alert-danger" role="alert">'+mess+'</div>'); };
var convertFile2=function(kinfo){ return sendConvertRequest(kinfo,convertFile2,convertSuccess2,convertFailed2); };
function startConvert(ftype,kinfo){
    var loading_html='<div class="loading text-center"> <img alt="converting..." class="mb-3" src="'+statics_path+'image/loading-m.gif"></div><div style="text-align:center;padding:10px;font-size:18px;"><p>'+processingMessages[getLangFromHTML()]+'</p></div>';
    $("#modalBody").html(loading_html);
    $('#mainModal').modal({ backdrop:'static', keyboard:false });
    convertFile2(kinfo);
}
function getLangFromHTML(){ var htmlLang=document.documentElement.getAttribute('lang'); if(!htmlLang) return 'en'; var lang=htmlLang.toLowerCase(); if(processingMessages[lang]) return lang; var shortLang=lang.split('-')[0]; if(processingMessages[shortLang]) return shortLang; return 'en'; }
function pasteMM(){
    navigator.clipboard.readText().then(function(text){
        document.getElementById("search__input").value = text;
        showClearBtn();
    }).catch(function(e){ console.log(e); });
}

function showClearBtn(){
    var q=$("#search__input").val().trim(); var $btn=$("#btn-paste"); if(!$btn.length) return;
    if(q){ if(!$("#btn-paste").hasClass('act-clear')){ $("#btn-paste").addClass('act-clear'); $("#btn-paste .icon-action").html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/></svg>'); $("#btn-paste span").text('Clear'); } }
    else { if($("#btn-paste").hasClass('act-clear')){ $("#btn-paste").removeClass('act-clear'); $("#btn-paste .icon-action").html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M10 1.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5zm-5 0A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5v1A1.5 1.5 0 0 1 9.5 4h-3A2.5 2.5 0 0 1 5 2.5zm-2 0h1v1A2.5 2.5 0 0 0 6.5 5h3A2.5 2.5 0 0 0 12 2.5v-1h1a2 2 0 0 1 2 2V14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3.5a2 2 0 0 1 2-2"/></svg>'); $("#btn-paste span").text('Paste'); } }
}


function extractPlaylist(){
    var purl=$("#search__input").val().trim();
    try{
        var params=new URLSearchParams(new URL(purl).search);
        if(params.has("list")){
            $.ajax({
                type:"POST", url:k_url_search, dataType:"json",
                data:{ playlist:purl, cf_token:ssvid_token },
                beforeSend:function(){ ensurePlaylistSkeleton('#search_container',36); },
                success: function(sdata){
                    if (typeof sdata.status !== "undefined" && sdata.status === 'ok' && Array.isArray(sdata.items) && sdata.items.length > 0) {
                        fillPlaylistInPlace(sdata.items, '#search_container');
                    } else {
                        $('#search_container').empty().css('min-height','');
                    }
                },
                error: function(){
                    $('#search_container').empty().css('min-height','');
                }
            });
        }
    }catch(e){ console.log("invalid url"); }
}

var expireTimer=null;
function getHTMLSuccess(dlink){
    if(expireTimer) clearTimeout(expireTimer);
    expireTimer=setTimeout(function (){ $("#mainModal").modal('hide'); $("#modalBody").html(''); }, 60*60*1000);
    return '<p style="font-size:17px;" class="text-center">' + readyMessages[getLangFromHTML()] + '</p>' +
        '<div class="d-flex justify-content-center mb-4"><a aria-label="Download file" href="#" data-file="' + dlink + '" class="btn btn-success btnFile" rel="noopener noreferrer" target="_blank" download>' + txt_download + '</a></div>' +
        '<div style="margin-top:15px;font-size:17px;"></div>';
}
var m_banner_app = {
    storageKey: 'm_banner_app',
    isShown: true,

    initBannerApp: function () {
        if( $('#adInstallAndroid').length )
        {
            if(this.canShow()){
                $('#adInstallAndroid').show();
            }
        }
    },

    canShow: function () {
        if (!window.localStorage) {
            return true;
        }

        var data = localStorage.getItem(this.storageKey);
        if (!data) {
            return true;
        }
        data = parseInt(data);

        var time = (new Date()).getTime() - 86400000;
        if (data < time) {
            return true;
        }

        return false;
    },

    setClosed: function () {
        if ( !window.localStorage ) {
            return;
        }
        var data = localStorage.getItem(this.storageKey);
        data = (new Date()).getTime();
        localStorage.setItem(this.storageKey, data);
    }
};
m_banner_app.initBannerApp();
function closeAdAndroid()
{
    $("#adInstallAndroid").css('display','none');
    m_banner_app.setClosed();
}


$(document).ready(function(){

    if(captcha_required && typeof turnstile=="undefined"){
        $.ajax({ url:"https://challenges.cloudflare.com/turnstile/v0/api.js", dataType:"script", cache:true });
    }

    $('#btn-start').click(function(){ ksearchvideo(); });

    $('#search-form').on('keyup keypress', function(e){
        var keyCode=e.keyCode||e.which;
        if(keyCode===13){ e.preventDefault(); ksearchvideo(); }
    });

    if($('#search__input').val()){ ksearchvideo(); }

    $(window).click(function(event){
        var $target=$(event.target); var $parent=$target.closest(".sub-language"); var $show=$target.closest(".language");
        if($parent.length==0 && $show.length==0){ var $search=$('.sub-language'); $search.removeClass("show-language"); }
    });

    $.ajaxSetup({ cache:true });
    $.getScript(statics_path+"js/lazyload.min.js", lazy_loaded_callback);

    $(document).on('click','.btn-generic-download',function(e){
        var downloadUrl=$(this).attr('href');
        $("#modalBody").html(getHTMLSuccess(downloadUrl));
        $('#mainModal').modal('show');
        var tp=document.querySelector('.trustpilot-widget'); if(tp && window.Trustpilot){ window.Trustpilot.loadFromElement(tp); }
    });


    $(document).on('click','.videoItem',function(){
        var videoId=$(this).data('vid');
        var youtubeLink="https://www.youtube.com/watch?v="+videoId;
        $("#search__input").val(youtubeLink);
        ksearchvideo({ clearSearch:false, preservePlaylist:true });
        $('html, body').animate({ scrollTop: $("#search__input").offset().top }, 600);
    });

    if(!(navigator.clipboard && navigator.clipboard.readText)){ $("#btn-paste").hide(); }
    else {
        $("#search__input").on("input", function(){ showClearBtn(); });
        $("#btn-paste").on('click', function(){
            if($("#btn-paste").hasClass('act-clear')){ $("#search__input").val(''); showClearBtn(); }
            else { pasteMM(); }
        });
    }

    function handleHash(){
        var h = window.location.hash || "";
        if(h.startsWith("#")){
            var decoded = decodeURIComponent(h.substring(1));
            if(decoded){
                $("#search__input").val(decoded);
                ksearchvideo();
            }
        }
    }

    handleHash();

});
document.addEventListener("click", function(e) {
    var btn = e.target.closest(".btnFile");
    if (!btn) return;

    e.preventDefault();

    var fileUrl = btn.getAttribute("data-file");
    var storageKey = "ads_shown_" + fileUrl;
    var now = Date.now();
    var shownTime = localStorage.getItem(storageKey);

    if (!shownTime || (now - parseInt(shownTime, 10)) > 86400000) {
        window.open("https://obqj2.com/4/9948874", "_blank");
        localStorage.setItem(storageKey, now.toString());
    }

    var link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", "");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});