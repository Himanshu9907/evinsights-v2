// 'use client';
// import { createContext, useContext, useEffect, useMemo, useState } from 'react';
// import { CURRENCIES, DEFAULT_CURRENCY, DEFAULT_LANGUAGE, LANGUAGES, currencyMeta } from '@/config/global-markets';

// const DICT = {
//   en:{cars:'Cars',compare:'Compare',reviews:'Reviews',articles:'Articles',guides:'Guides',news:'News',search:'Search cars, brands, models…',overview:'Overview',variants:'Variants',specs:'Specs',charging:'Charging',features:'Features',safety:'Safety',gallery:'Gallery',starting:'Starting from',range:'Max Range (WLTP)',accel:'0–100 km/h',compareBtn:'Compare',availability:'Check Availability',save:'Save',highlights:'Key Highlights',pricing:'Variants & Pricing',chargingTitle:'Charging',specifications:'Specifications',dimensions:'Dimensions',safetyTitle:'Safety',markets:'Market Availability',reviewsCount:'reviews',battery:'Battery',power:'Power',topSpeed:'Top Speed',seats:'Seating',driveType:'Drive Type',viewAll:'View all variants',chargingGuide:'View charging guide',fullSpecs:'View full specs',safetyDetails:'View safety details',latestReview:'Latest Review',articlesTitle:'Articles',similar:'Similar EVs',sources:'Sources',verified:'Verified',electricSuv:'Electric SUV',electricVehicle:'Electric vehicle',notPublished:'Not published',readReview:'Read review',viewArticle:'Read article',home:'Home',carsCrumb:'Cars',demoNote:'Demo dataset — verify current local pricing and specifications before purchase.'},
//   hi:{cars:'कारें',compare:'तुलना',reviews:'रिव्यू',articles:'आर्टिकल्स',guides:'गाइड्स',news:'न्यूज़',search:'कार, ब्रांड या मॉडल खोजें…',overview:'ओवरव्यू',variants:'वेरिएंट्स',specs:'स्पेक्स',charging:'चार्जिंग',features:'फीचर्स',safety:'सेफ्टी',gallery:'गैलरी',starting:'शुरुआती कीमत',range:'अधिकतम रेंज (WLTP)',accel:'0–100 किमी/घं.',compareBtn:'तुलना करें',availability:'उपलब्धता देखें',save:'सेव करें',highlights:'मुख्य खूबियाँ',pricing:'वेरिएंट्स और कीमत',chargingTitle:'चार्जिंग',specifications:'स्पेसिफिकेशन',dimensions:'डायमेंशन',safetyTitle:'सेफ्टी',markets:'मार्केट उपलब्धता',reviewsCount:'रिव्यू',battery:'बैटरी',power:'पावर',topSpeed:'टॉप स्पीड',seats:'सीटिंग',driveType:'ड्राइव टाइप',viewAll:'सभी वेरिएंट देखें',chargingGuide:'चार्जिंग गाइड देखें',fullSpecs:'पूरे स्पेक्स देखें',safetyDetails:'सेफ्टी डिटेल देखें',latestReview:'नवीनतम रिव्यू',articlesTitle:'आर्टिकल्स',similar:'मिलती-जुलती EVs',sources:'सोर्सेज',verified:'वेरिफाइड',electricSuv:'इलेक्ट्रिक SUV',electricVehicle:'इलेक्ट्रिक वाहन',notPublished:'उपलब्ध नहीं',readReview:'रिव्यू पढ़ें',viewArticle:'आर्टिकल पढ़ें',home:'होम',carsCrumb:'कारें',demoNote:'डेमो डेटा — खरीदने से पहले स्थानीय कीमत और स्पेसिफिकेशन सत्यापित करें।'},
//   es:{cars:'Coches',compare:'Comparar',reviews:'Reseñas',articles:'Artículos',guides:'Guías',news:'Noticias',search:'Buscar coches, marcas, modelos…',overview:'Resumen',variants:'Versiones',specs:'Especificaciones',charging:'Carga',features:'Equipamiento',safety:'Seguridad',gallery:'Galería',starting:'Desde',range:'Autonomía máxima (WLTP)',accel:'0–100 km/h',compareBtn:'Comparar',availability:'Ver disponibilidad',save:'Guardar',highlights:'Puntos clave',pricing:'Versiones y precios',chargingTitle:'Carga',specifications:'Especificaciones',dimensions:'Dimensiones',safetyTitle:'Seguridad',markets:'Disponibilidad por mercado',reviewsCount:'reseñas',battery:'Batería',power:'Potencia',topSpeed:'Velocidad máxima',seats:'Plazas',driveType:'Tracción',viewAll:'Ver todas las versiones',chargingGuide:'Ver guía de carga',fullSpecs:'Ver especificaciones',safetyDetails:'Ver seguridad',latestReview:'Última reseña',articlesTitle:'Artículos',similar:'EV similares',sources:'Fuentes',verified:'Verificado',electricSuv:'SUV eléctrico',electricVehicle:'Vehículo eléctrico',notPublished:'No publicado',readReview:'Leer reseña',viewArticle:'Leer artículo',home:'Inicio',carsCrumb:'Coches',demoNote:'Datos de demostración: verifica los precios y especificaciones locales antes de comprar.'},
//   fr:{cars:'Voitures',compare:'Comparer',reviews:'Avis',articles:'Articles',guides:'Guides',news:'Actualités',search:'Rechercher voitures, marques, modèles…',overview:'Aperçu',variants:'Versions',specs:'Spécifications',charging:'Recharge',features:'Équipements',safety:'Sécurité',gallery:'Galerie',starting:'À partir de',range:'Autonomie max. (WLTP)',accel:'0–100 km/h',compareBtn:'Comparer',availability:'Voir disponibilité',save:'Enregistrer',highlights:'Points forts',pricing:'Versions et prix',chargingTitle:'Recharge',specifications:'Spécifications',dimensions:'Dimensions',safetyTitle:'Sécurité',markets:'Disponibilité par marché',reviewsCount:'avis',battery:'Batterie',power:'Puissance',topSpeed:'Vitesse max.',seats:'Places',driveType:'Transmission',viewAll:'Voir toutes les versions',chargingGuide:'Voir le guide de recharge',fullSpecs:'Voir les spécifications',safetyDetails:'Voir la sécurité',latestReview:'Dernier avis',articlesTitle:'Articles',similar:'VE similaires',sources:'Sources',verified:'Vérifié',electricSuv:'SUV électrique',electricVehicle:'Véhicule électrique',notPublished:'Non publié',readReview:'Lire l’avis',viewArticle:'Lire l’article',home:'Accueil',carsCrumb:'Voitures',demoNote:'Données de démonstration : vérifiez les prix et spécifications locaux avant achat.'},
//   de:{cars:'Autos',compare:'Vergleichen',reviews:'Tests',articles:'Artikel',guides:'Ratgeber',news:'News',search:'Autos, Marken, Modelle suchen…',overview:'Übersicht',variants:'Varianten',specs:'Daten',charging:'Laden',features:'Ausstattung',safety:'Sicherheit',gallery:'Galerie',starting:'Ab',range:'Max. Reichweite (WLTP)',accel:'0–100 km/h',compareBtn:'Vergleichen',availability:'Verfügbarkeit',save:'Speichern',highlights:'Highlights',pricing:'Varianten & Preise',chargingTitle:'Laden',specifications:'Spezifikationen',dimensions:'Abmessungen',safetyTitle:'Sicherheit',markets:'Marktverfügbarkeit',reviewsCount:'Bewertungen',battery:'Batterie',power:'Leistung',topSpeed:'Höchstgeschwindigkeit',seats:'Sitze',driveType:'Antrieb',viewAll:'Alle Varianten',chargingGuide:'Ladeguide ansehen',fullSpecs:'Alle Daten',safetyDetails:'Sicherheitsdetails',latestReview:'Neuester Test',articlesTitle:'Artikel',similar:'Ähnliche EVs',sources:'Quellen',verified:'Verifiziert',electricSuv:'Elektro-SUV',electricVehicle:'Elektrofahrzeug',notPublished:'Nicht veröffentlicht',readReview:'Test lesen',viewArticle:'Artikel lesen',home:'Startseite',carsCrumb:'Autos',demoNote:'Demodaten – aktuelle lokale Preise und Daten vor dem Kauf prüfen.'},
//   it:{cars:'Auto',compare:'Confronta',reviews:'Recensioni',articles:'Articoli',guides:'Guide',news:'Notizie',search:'Cerca auto, marchi, modelli…',overview:'Panoramica',variants:'Versioni',specs:'Specifiche',charging:'Ricarica',features:'Dotazioni',safety:'Sicurezza',gallery:'Galleria',starting:'A partire da',range:'Autonomia max (WLTP)',accel:'0–100 km/h',compareBtn:'Confronta',availability:'Vedi disponibilità',save:'Salva',highlights:'Punti chiave',pricing:'Versioni e prezzi',chargingTitle:'Ricarica',specifications:'Specifiche',dimensions:'Dimensioni',safetyTitle:'Sicurezza',markets:'Disponibilità mercati',reviewsCount:'recensioni',battery:'Batteria',power:'Potenza',topSpeed:'Velocità massima',seats:'Posti',driveType:'Trazione',viewAll:'Vedi tutte le versioni',chargingGuide:'Guida alla ricarica',fullSpecs:'Specifiche complete',safetyDetails:'Dettagli sicurezza',latestReview:'Ultima recensione',articlesTitle:'Articoli',similar:'EV simili',sources:'Fonti',verified:'Verificato',electricSuv:'SUV elettrico',electricVehicle:'Veicolo elettrico',notPublished:'Non pubblicato',readReview:'Leggi recensione',viewArticle:'Leggi articolo',home:'Home',carsCrumb:'Auto',demoNote:'Dati demo: verifica prezzi e specifiche locali prima dell’acquisto.'},
//   pt:{cars:'Carros',compare:'Comparar',reviews:'Avaliações',articles:'Artigos',guides:'Guias',news:'Notícias',search:'Pesquisar carros, marcas, modelos…',overview:'Visão geral',variants:'Versões',specs:'Especificações',charging:'Carregamento',features:'Recursos',safety:'Segurança',gallery:'Galeria',starting:'A partir de',range:'Autonomia máxima (WLTP)',accel:'0–100 km/h',compareBtn:'Comparar',availability:'Ver disponibilidade',save:'Salvar',highlights:'Destaques',pricing:'Versões e preços',chargingTitle:'Carregamento',specifications:'Especificações',dimensions:'Dimensões',safetyTitle:'Segurança',markets:'Disponibilidade por mercado',reviewsCount:'avaliações',battery:'Bateria',power:'Potência',topSpeed:'Velocidade máxima',seats:'Lugares',driveType:'Tração',viewAll:'Ver todas as versões',chargingGuide:'Ver guia de carregamento',fullSpecs:'Ver especificações',safetyDetails:'Ver segurança',latestReview:'Avaliação mais recente',articlesTitle:'Artigos',similar:'EVs semelhantes',sources:'Fontes',verified:'Verificado',electricSuv:'SUV elétrico',electricVehicle:'Veículo elétrico',notPublished:'Não publicado',readReview:'Ler avaliação',viewArticle:'Ler artigo',home:'Início',carsCrumb:'Carros',demoNote:'Dados de demonstração: confirme preços e especificações locais antes de comprar.'},
//   ja:{cars:'車種',compare:'比較',reviews:'レビュー',articles:'記事',guides:'ガイド',news:'ニュース',search:'車・ブランド・モデルを検索…',overview:'概要',variants:'グレード',specs:'仕様',charging:'充電',features:'機能',safety:'安全性',gallery:'ギャラリー',starting:'価格',range:'最大航続距離 (WLTP)',accel:'0–100 km/h',compareBtn:'比較する',availability:'在庫を見る',save:'保存',highlights:'主な特徴',pricing:'グレードと価格',chargingTitle:'充電',specifications:'仕様',dimensions:'寸法',safetyTitle:'安全性',markets:'販売市場',reviewsCount:'レビュー',battery:'バッテリー',power:'出力',topSpeed:'最高速度',seats:'乗車定員',driveType:'駆動方式',viewAll:'全グレードを見る',chargingGuide:'充電ガイド',fullSpecs:'全仕様を見る',safetyDetails:'安全性の詳細',latestReview:'最新レビュー',articlesTitle:'記事',similar:'類似EV',sources:'情報源',verified:'確認済み',electricSuv:'電動SUV',electricVehicle:'電気自動車',notPublished:'未掲載',readReview:'レビューを読む',viewArticle:'記事を読む',home:'ホーム',carsCrumb:'車種',demoNote:'デモデータです。購入前に現地の価格と仕様を確認してください。'},
//   ko:{cars:'차량',compare:'비교',reviews:'리뷰',articles:'기사',guides:'가이드',news:'뉴스',search:'차량, 브랜드, 모델 검색…',overview:'개요',variants:'트림',specs:'제원',charging:'충전',features:'기능',safety:'안전',gallery:'갤러리',starting:'시작 가격',range:'최대 주행거리 (WLTP)',accel:'0–100 km/h',compareBtn:'비교',availability:'판매 여부',save:'저장',highlights:'주요 특징',pricing:'트림 및 가격',chargingTitle:'충전',specifications:'제원',dimensions:'크기',safetyTitle:'안전',markets:'시장 판매 현황',reviewsCount:'리뷰',battery:'배터리',power:'출력',topSpeed:'최고 속도',seats:'좌석',driveType:'구동 방식',viewAll:'전체 트림 보기',chargingGuide:'충전 가이드',fullSpecs:'전체 제원',safetyDetails:'안전 상세',latestReview:'최신 리뷰',articlesTitle:'기사',similar:'비슷한 EV',sources:'출처',verified:'검증됨',electricSuv:'전기 SUV',electricVehicle:'전기차',notPublished:'미게시',readReview:'리뷰 읽기',viewArticle:'기사 읽기',home:'홈',carsCrumb:'차량',demoNote:'데모 데이터입니다. 구매 전에 현지 가격과 제원을 확인하세요.'},
//   zh:{cars:'车型',compare:'对比',reviews:'评测',articles:'文章',guides:'指南',news:'新闻',search:'搜索汽车、品牌、车型…',overview:'概览',variants:'版本',specs:'参数',charging:'充电',features:'配置',safety:'安全',gallery:'图库',starting:'起售价',range:'最大续航 (WLTP)',accel:'0–100 km/h',compareBtn:'对比',availability:'查看可用性',save:'收藏',highlights:'核心亮点',pricing:'版本与价格',chargingTitle:'充电',specifications:'参数',dimensions:'尺寸',safetyTitle:'安全',markets:'市场供应',reviewsCount:'条评测',battery:'电池',power:'功率',topSpeed:'最高时速',seats:'座位',driveType:'驱动形式',viewAll:'查看全部版本',chargingGuide:'查看充电指南',fullSpecs:'查看完整参数',safetyDetails:'查看安全详情',latestReview:'最新评测',articlesTitle:'文章',similar:'相似电动车',sources:'来源',verified:'已验证',electricSuv:'纯电SUV',electricVehicle:'电动车',notPublished:'未发布',readReview:'阅读评测',viewArticle:'阅读文章',home:'首页',carsCrumb:'车型',demoNote:'演示数据。购买前请核实当地价格和规格。'},
//   ar:{cars:'السيارات',compare:'مقارنة',reviews:'المراجعات',articles:'المقالات',guides:'الأدلة',news:'الأخبار',search:'ابحث عن سيارة أو علامة أو طراز…',overview:'نظرة عامة',variants:'الفئات',specs:'المواصفات',charging:'الشحن',features:'المزايا',safety:'السلامة',gallery:'المعرض',starting:'تبدأ من',range:'أقصى مدى (WLTP)',accel:'0–100 كم/س',compareBtn:'قارن',availability:'تحقق من التوفر',save:'حفظ',highlights:'أبرز المزايا',pricing:'الفئات والأسعار',chargingTitle:'الشحن',specifications:'المواصفات',dimensions:'الأبعاد',safetyTitle:'السلامة',markets:'التوفر حسب السوق',reviewsCount:'مراجعة',battery:'البطارية',power:'القوة',topSpeed:'السرعة القصوى',seats:'المقاعد',driveType:'نظام الدفع',viewAll:'عرض كل الفئات',chargingGuide:'دليل الشحن',fullSpecs:'عرض المواصفات كاملة',safetyDetails:'تفاصيل السلامة',latestReview:'أحدث مراجعة',articlesTitle:'المقالات',similar:'سيارات كهربائية مشابهة',sources:'المصادر',verified:'موثق',electricSuv:'SUV كهربائية',electricVehicle:'سيارة كهربائية',notPublished:'غير منشور',readReview:'اقرأ المراجعة',viewArticle:'اقرأ المقال',home:'الرئيسية',carsCrumb:'السيارات',demoNote:'بيانات تجريبية — تحقق من الأسعار والمواصفات المحلية قبل الشراء.'}
// };


// const EXTRA = {
//   en:{'electric vehicles':'electric vehicles','EVs':'EVs','variants':'variants','sources':'sources','open':'Open','view details':'View details','read article':'Read article','read review':'Read review','starting price':'Starting price','range':'Range','battery':'Battery','power':'Power','monthly distance (km)':'Monthly distance (km)','efficiency (kWh / 100 km)':'Efficiency (kWh / 100 km)','electricity price (₹ / kWh)':'Electricity price','estimated monthly charging cost':'Estimated monthly charging cost'},
//   hi:{'electric vehicles':'इलेक्ट्रिक वाहन','EVs':'EVs','variants':'वेरिएंट्स','sources':'सोर्सेज','open':'खोलें','view details':'डिटेल देखें','read article':'आर्टिकल पढ़ें','read review':'रिव्यू पढ़ें','starting price':'शुरुआती कीमत','range':'रेंज','battery':'बैटरी','power':'पावर','monthly distance (km)':'मासिक दूरी (किमी)','efficiency (kWh / 100 km)':'दक्षता (kWh / 100 किमी)','electricity price (₹ / kWh)':'बिजली की कीमत','estimated monthly charging cost':'अनुमानित मासिक चार्जिंग लागत'},
//   es:{'electric vehicles':'vehículos eléctricos','EVs':'EVs','variants':'versiones','sources':'fuentes','open':'Abrir','view details':'Ver detalles','read article':'Leer artículo','read review':'Leer reseña','starting price':'precio inicial','range':'autonomía','battery':'batería','power':'potencia','estimated monthly charging cost':'coste mensual estimado'},
//   fr:{'electric vehicles':'véhicules électriques','EVs':'VE','variants':'versions','sources':'sources','open':'Ouvrir','view details':'Voir les détails','read article':'Lire l’article','read review':'Lire l’avis','starting price':'prix de départ','range':'autonomie','battery':'batterie','power':'puissance','estimated monthly charging cost':'coût mensuel estimé'},
//   de:{'electric vehicles':'Elektrofahrzeuge','EVs':'EVs','variants':'Varianten','sources':'Quellen','open':'Öffnen','view details':'Details ansehen','read article':'Artikel lesen','read review':'Test lesen','starting price':'Startpreis','range':'Reichweite','battery':'Batterie','power':'Leistung','estimated monthly charging cost':'geschätzte monatliche Ladekosten'},
//   it:{'electric vehicles':'veicoli elettrici','EVs':'EV','variants':'versioni','sources':'fonti','open':'Apri','view details':'Vedi dettagli','read article':'Leggi articolo','read review':'Leggi recensione','starting price':'prezzo di partenza','range':'autonomia','battery':'batteria','power':'potenza','estimated monthly charging cost':'costo mensile stimato'},
//   pt:{'electric vehicles':'veículos elétricos','EVs':'EVs','variants':'versões','sources':'fontes','open':'Abrir','view details':'Ver detalhes','read article':'Ler artigo','read review':'Ler avaliação','starting price':'preço inicial','range':'autonomia','battery':'bateria','power':'potência','estimated monthly charging cost':'custo mensal estimado'},
//   ja:{'electric vehicles':'電気自動車','EVs':'EV','variants':'グレード','sources':'情報源','open':'開く','view details':'詳細を見る','read article':'記事を読む','read review':'レビューを読む','starting price':'開始価格','range':'航続距離','battery':'バッテリー','power':'出力','estimated monthly charging cost':'月間充電費用の目安'},
//   ko:{'electric vehicles':'전기차','EVs':'EV','variants':'트림','sources':'출처','open':'열기','view details':'상세 보기','read article':'기사 읽기','read review':'리뷰 읽기','starting price':'시작 가격','range':'주행거리','battery':'배터리','power':'출력','estimated monthly charging cost':'예상 월 충전 비용'},
//   zh:{'electric vehicles':'电动车','EVs':'EV','variants':'版本','sources':'来源','open':'打开','view details':'查看详情','read article':'阅读文章','read review':'阅读评测','starting price':'起售价','range':'续航','battery':'电池','power':'功率','estimated monthly charging cost':'预计月充电成本'},
//   ar:{'electric vehicles':'سيارة كهربائية','EVs':'EV','variants':'الفئات','sources':'المصادر','open':'فتح','view details':'عرض التفاصيل','read article':'اقرأ المقال','read review':'اقرأ المراجعة','starting price':'السعر الابتدائي','range':'المدى','battery':'البطارية','power':'القوة','estimated monthly charging cost':'تكلفة الشحن الشهرية المقدرة'}
// };

// const UI_OVERLAY = {
//  en:{'Electric vehicle intelligence':'Electric vehicle intelligence','Know the EV before you buy it.':'Know the EV before you buy it.','Explore all EVs':'Explore all EVs','Compare cars':'Compare cars','Source-backed':'Source-backed','Global markets':'Global markets','Manual editorial data':'Manual editorial data','Discover':'Discover','Featured electric cars':'Featured electric cars','View all →':'View all →','Explore by need':'Explore by need','Everything around the EV decision.':'Everything around the EV decision.','Find an EV':'Find an EV','Compare EVs':'Compare EVs','Read reviews':'Read reviews','Learn EVs':'Learn EVs','Why EVInsights':'Why EVInsights','Built for better EV decisions.':'Built for better EV decisions.','Source-backed facts':'Source-backed facts','One complete vehicle page':'One complete vehicle page','Global-ready structure':'Global-ready structure','Read & learn':'Read & learn','Latest EV insights':'Latest EV insights','Community voice':'Community voice','Recent EV reviews.':'Recent EV reviews.','Global coverage':'Global coverage','Built to grow across markets.':'Built to grow across markets.','Ready to compare?':'Ready to compare?','Pick the EV that fits your life.':'Pick the EV that fits your life.','Explore EVs →':'Explore EVs →','Open comparison studio →':'Open comparison studio →','EV directory':'EV directory','Electric cars, properly organized.':'Electric cars, properly organized.','Search':'Search','All brands':'All brands','Catalog':'Catalog','Comparison studio →':'Comparison studio →','Manufacturers':'Manufacturers','Explore EV brands.':'Explore EV brands.','EV knowledge':'EV knowledge','Articles that explain the EV world.':'Articles that explain the EV world.','EVInsights reviews':'EVInsights reviews','Reviews built from traceable data.':'Reviews built from traceable data.','EV knowledge hub':'EV knowledge hub','Guides for first-time and experienced EV buyers.':'Guides for first-time and experienced EV buyers.','EV ownership tool':'EV ownership tool','Charging cost calculator.':'Charging cost calculator.','Open vehicle →':'Open vehicle →','View details':'View details','Explore tools →':'Explore tools →','Electric cars':'Electric cars','EV guides':'EV guides','Charging calculator':'Charging calculator','Explore':'Explore','Learn':'Learn','Something went wrong':'Something went wrong','We hit a temporary problem.':'We hit a temporary problem.','Try again':'Try again','Home':'Home','Browse EVs':'Browse EVs'},
//  hi:{'Electric vehicle intelligence':'इलेक्ट्रिक वाहन इंटेलिजेंस','Know the EV before you buy it.':'खरीदने से पहले EV को जानें।','Explore all EVs':'सभी EV देखें','Compare cars':'कारों की तुलना करें','Source-backed':'सोर्स-बैक्ड','Global markets':'ग्लोबल मार्केट्स','Manual editorial data':'मैनुअल एडिटोरियल डेटा','Discover':'डिस्कवर','Featured electric cars':'फीचर्ड इलेक्ट्रिक कारें','View all →':'सभी देखें →','Explore by need':'ज़रूरत के अनुसार देखें','Everything around the EV decision.':'EV खरीद के फैसले की हर जानकारी।','Find an EV':'EV खोजें','Compare EVs':'EVs की तुलना करें','Read reviews':'रिव्यू पढ़ें','Learn EVs':'EVs सीखें','Why EVInsights':'EVInsights क्यों','Built for better EV decisions.':'बेहतर EV फैसलों के लिए बनाया गया।','Source-backed facts':'सोर्स-बैक्ड तथ्य','One complete vehicle page':'एक पूरा वाहन पेज','Global-ready structure':'ग्लोबल-रेडी स्ट्रक्चर','Read & learn':'पढ़ें और सीखें','Latest EV insights':'नवीनतम EV जानकारी','Community voice':'कम्युनिटी की राय','Recent EV reviews.':'हाल के EV रिव्यू।','Global coverage':'ग्लोबल कवरेज','Built to grow across markets.':'अलग-अलग मार्केट के लिए तैयार।','Ready to compare?':'तुलना के लिए तैयार?','Pick the EV that fits your life.':'अपने जीवन के लिए सही EV चुनें।','Explore EVs →':'EVs देखें →','Open comparison studio →':'तुलना स्टूडियो खोलें →','EV directory':'EV डायरेक्टरी','Electric cars, properly organized.':'इलेक्ट्रिक कारें, व्यवस्थित तरीके से।','All brands':'सभी ब्रांड','Catalog':'कैटलॉग','Comparison studio →':'तुलना स्टूडियो →','Manufacturers':'निर्माता','Explore EV brands.':'EV ब्रांड देखें।','EV knowledge':'EV ज्ञान','Articles that explain the EV world.':'EV दुनिया समझाने वाले आर्टिकल्स।','EVInsights reviews':'EVInsights रिव्यू','Reviews built from traceable data.':'ट्रेस करने योग्य डेटा पर आधारित रिव्यू।','EV knowledge hub':'EV नॉलेज हब','Guides for first-time and experienced EV buyers.':'नए और अनुभवी EV खरीदारों के लिए गाइड।','EV ownership tool':'EV ओनरशिप टूल','Charging cost calculator.':'चार्जिंग कॉस्ट कैलकुलेटर।','Open vehicle →':'वाहन खोलें →','Explore tools →':'टूल्स देखें →','Electric cars':'इलेक्ट्रिक कारें','EV guides':'EV गाइड्स','Charging calculator':'चार्जिंग कैलकुलेटर','Explore':'एक्सप्लोर','Learn':'सीखें','Something went wrong':'कुछ गलत हो गया','We hit a temporary problem.':'एक अस्थायी समस्या हुई।','Try again':'फिर कोशिश करें','Home':'होम','Browse EVs':'EVs ब्राउज़ करें'}
// };
// const UI_MORE={
//  en:{'Explore':'Explore','Learn':'Learn','Electric cars':'Electric cars','EV guides':'EV guides','Charging calculator':'Charging calculator','Explore all EVs':'Explore all EVs','Compare cars':'Compare cars','Featured electric cars':'Featured electric cars','Find an EV':'Find an EV','Compare EVs':'Compare EVs','Read reviews':'Read reviews','Latest EV insights':'Latest EV insights','Recent EV reviews.':'Recent EV reviews.','Global coverage':'Global coverage','Ready to compare?':'Ready to compare?','Pick the EV that fits your life.':'Pick the EV that fits your life.','Explore EVs →':'Explore EVs →','Open comparison studio →':'Open comparison studio →','All brands':'All brands','Catalog':'Catalog','Manufacturers':'Manufacturers','Explore EV brands.':'Explore EV brands.','EV knowledge':'EV knowledge','EV knowledge hub':'EV knowledge hub','EV ownership tool':'EV ownership tool','Charging cost calculator.':'Charging cost calculator.'},
//  hi:{'Explore':'एक्सप्लोर','Learn':'सीखें','Electric cars':'इलेक्ट्रिक कारें','EV guides':'EV गाइड्स','Charging calculator':'चार्जिंग कैलकुलेटर','Explore all EVs':'सभी EV देखें','Compare cars':'कारों की तुलना करें','Featured electric cars':'फीचर्ड इलेक्ट्रिक कारें','Find an EV':'EV खोजें','Compare EVs':'EVs की तुलना करें','Read reviews':'रिव्यू पढ़ें','Latest EV insights':'नवीनतम EV जानकारी','Recent EV reviews.':'हाल के EV रिव्यू','Global coverage':'ग्लोबल कवरेज','Ready to compare?':'तुलना के लिए तैयार?','Pick the EV that fits your life.':'अपने जीवन के लिए सही EV चुनें।','Explore EVs →':'EVs देखें →','Open comparison studio →':'तुलना स्टूडियो खोलें →','All brands':'सभी ब्रांड','Catalog':'कैटलॉग','Manufacturers':'निर्माता','Explore EV brands.':'EV ब्रांड देखें।','EV knowledge':'EV ज्ञान','EV knowledge hub':'EV नॉलेज हब','EV ownership tool':'EV ओनरशिप टूल','Charging cost calculator.':'चार्जिंग कॉस्ट कैलकुलेटर।'},
//  es:{'Explore':'Explorar','Learn':'Aprender','Electric cars':'Coches eléctricos','EV guides':'Guías EV','Charging calculator':'Calculadora de carga','Explore all EVs':'Explorar todos los EV','Compare cars':'Comparar coches','Featured electric cars':'Coches eléctricos destacados','Find an EV':'Encontrar un EV','Compare EVs':'Comparar EVs','Read reviews':'Leer reseñas','Latest EV insights':'Últimas novedades EV','Recent EV reviews.':'Reseñas EV recientes.','Global coverage':'Cobertura global','Ready to compare?':'¿Listo para comparar?','Pick the EV that fits your life.':'Elige el EV que encaja contigo.','Explore EVs →':'Explorar EVs →','Open comparison studio →':'Abrir comparador →','All brands':'Todas las marcas','Catalog':'Catálogo','Manufacturers':'Fabricantes','Explore EV brands.':'Explora marcas EV.','EV knowledge':'Conocimiento EV','EV knowledge hub':'Centro de conocimiento EV','EV ownership tool':'Herramienta de propiedad EV','Charging cost calculator.':'Calculadora de coste de carga.'},
//  fr:{'Explore':'Explorer','Learn':'Apprendre','Electric cars':'Voitures électriques','EV guides':'Guides VE','Charging calculator':'Calculateur de recharge','Explore all EVs':'Explorer tous les VE','Compare cars':'Comparer les voitures','Featured electric cars':'Véhicules électriques à la une','Find an EV':'Trouver un VE','Compare EVs':'Comparer les VE','Read reviews':'Lire les avis','Latest EV insights':'Dernières infos VE','Recent EV reviews.':'Avis VE récents.','Global coverage':'Couverture mondiale','Ready to compare?':'Prêt à comparer ?','Pick the EV that fits your life.':'Choisissez le VE adapté à votre vie.','Explore EVs →':'Explorer les VE →','Open comparison studio →':'Ouvrir le comparateur →','All brands':'Toutes les marques','Catalog':'Catalogue','Manufacturers':'Constructeurs','Explore EV brands.':'Explorer les marques VE.','EV knowledge':'Connaissance VE','EV knowledge hub':'Centre de connaissance VE','EV ownership tool':'Outil de propriété VE','Charging cost calculator.':'Calculateur du coût de recharge.'},
//  de:{'Explore':'Entdecken','Learn':'Lernen','Electric cars':'Elektroautos','EV guides':'EV-Ratgeber','Charging calculator':'Laderechner','Explore all EVs':'Alle EVs entdecken','Compare cars':'Autos vergleichen','Featured electric cars':'Ausgewählte Elektroautos','Find an EV':'EV finden','Compare EVs':'EVs vergleichen','Read reviews':'Tests lesen','Latest EV insights':'Neueste EV-Infos','Recent EV reviews.':'Aktuelle EV-Tests.','Global coverage':'Globale Abdeckung','Ready to compare?':'Bereit zum Vergleichen?','Pick the EV that fits your life.':'Wähle das EV, das zu dir passt.','Explore EVs →':'EVs entdecken →','Open comparison studio →':'Vergleich öffnen →','All brands':'Alle Marken','Catalog':'Katalog','Manufacturers':'Hersteller','Explore EV brands.':'EV-Marken entdecken.','EV knowledge':'EV-Wissen','EV knowledge hub':'EV-Wissenszentrum','EV ownership tool':'EV-Besitztool','Charging cost calculator.':'Ladekostenrechner'},
//  it:{'Explore':'Esplora','Learn':'Impara','Electric cars':'Auto elettriche','EV guides':'Guide EV','Charging calculator':'Calcolatore ricarica','Explore all EVs':'Esplora tutti gli EV','Compare cars':'Confronta auto','Featured electric cars':'Auto elettriche in evidenza','Find an EV':'Trova un EV','Compare EVs':'Confronta EV','Read reviews':'Leggi recensioni','Latest EV insights':'Ultime novità EV','Recent EV reviews.':'Recensioni EV recenti.','Global coverage':'Copertura globale','Ready to compare?':'Pronto a confrontare?','Pick the EV that fits your life.':'Scegli l’EV adatto alla tua vita.','Explore EVs →':'Esplora EV →','Open comparison studio →':'Apri il confronto →','All brands':'Tutti i marchi','Catalog':'Catalogo','Manufacturers':'Costruttori','Explore EV brands.':'Esplora i marchi EV.','EV knowledge':'Conoscenza EV','EV knowledge hub':'Hub conoscenza EV','EV ownership tool':'Strumento proprietà EV','Charging cost calculator.':'Calcolatore costi di ricarica'},
//  pt:{'Explore':'Explorar','Learn':'Aprender','Electric cars':'Carros elétricos','EV guides':'Guias EV','Charging calculator':'Calculadora de carregamento','Explore all EVs':'Explorar todos os EVs','Compare cars':'Comparar carros','Featured electric cars':'Carros elétricos em destaque','Find an EV':'Encontrar um EV','Compare EVs':'Comparar EVs','Read reviews':'Ler avaliações','Latest EV insights':'Últimas informações EV','Recent EV reviews.':'Avaliações EV recentes.','Global coverage':'Cobertura global','Ready to compare?':'Pronto para comparar?','Pick the EV that fits your life.':'Escolha o EV que combina com sua vida.','Explore EVs →':'Explorar EVs →','Open comparison studio →':'Abrir comparador →','All brands':'Todas as marcas','Catalog':'Catálogo','Manufacturers':'Fabricantes','Explore EV brands.':'Explore marcas EV.','EV knowledge':'Conhecimento EV','EV knowledge hub':'Central de conhecimento EV','EV ownership tool':'Ferramenta de propriedade EV','Charging cost calculator.':'Calculadora de custo de carregamento'},
//  ja:{'Explore':'探す','Learn':'学ぶ','Electric cars':'電気自動車','EV guides':'EVガイド','Charging calculator':'充電計算機','Explore all EVs':'すべてのEVを見る','Compare cars':'車を比較','Featured electric cars':'注目の電気自動車','Find an EV':'EVを探す','Compare EVs':'EVを比較','Read reviews':'レビューを読む','Latest EV insights':'最新EV情報','Recent EV reviews.':'最新のEVレビュー','Global coverage':'グローバル対応','Ready to compare?':'比較の準備はできましたか？','Pick the EV that fits your life.':'あなたの生活に合うEVを選ぼう。','Explore EVs →':'EVを見る →','Open comparison studio →':'比較スタジオを開く →','All brands':'すべてのブランド','Catalog':'カタログ','Manufacturers':'メーカー','Explore EV brands.':'EVブランドを見る。','EV knowledge':'EV知識','EV knowledge hub':'EVナレッジハブ','EV ownership tool':'EV所有ツール','Charging cost calculator.':'充電コスト計算機'},
//  ko:{'Explore':'탐색','Learn':'학습','Electric cars':'전기차','EV guides':'EV 가이드','Charging calculator':'충전 계산기','Explore all EVs':'모든 EV 보기','Compare cars':'차량 비교','Featured electric cars':'추천 전기차','Find an EV':'EV 찾기','Compare EVs':'EV 비교','Read reviews':'리뷰 읽기','Latest EV insights':'최신 EV 정보','Recent EV reviews.':'최근 EV 리뷰','Global coverage':'글로벌 커버리지','Ready to compare?':'비교할 준비가 되셨나요?','Pick the EV that fits your life.':'생활에 맞는 EV를 선택하세요.','Explore EVs →':'EV 보기 →','Open comparison studio →':'비교 스튜디오 열기 →','All brands':'모든 브랜드','Catalog':'카탈로그','Manufacturers':'제조사','Explore EV brands.':'EV 브랜드 탐색','EV knowledge':'EV 지식','EV knowledge hub':'EV 지식 허브','EV ownership tool':'EV 소유 도구','Charging cost calculator.':'충전 비용 계산기'},
//  zh:{'Explore':'探索','Learn':'学习','Electric cars':'电动车','EV guides':'电动车指南','Charging calculator':'充电计算器','Explore all EVs':'查看全部电动车','Compare cars':'比较车型','Featured electric cars':'精选电动车','Find an EV':'寻找电动车','Compare EVs':'对比电动车','Read reviews':'阅读评测','Latest EV insights':'最新电动车资讯','Recent EV reviews.':'最新电动车评测','Global coverage':'全球覆盖','Ready to compare?':'准备好比较了吗？','Pick the EV that fits your life.':'选择适合你生活的电动车。','Explore EVs →':'探索EV →','Open comparison studio →':'打开对比工具 →','All brands':'全部品牌','Catalog':'目录','Manufacturers':'制造商','Explore EV brands.':'探索电动车品牌','EV knowledge':'电动车知识','EV knowledge hub':'电动车知识中心','EV ownership tool':'电动车拥有工具','Charging cost calculator.':'充电成本计算器'},
//  ar:{'Explore':'استكشف','Learn':'تعلّم','Electric cars':'السيارات الكهربائية','EV guides':'أدلة السيارات الكهربائية','Charging calculator':'حاسبة الشحن','Explore all EVs':'استكشف جميع السيارات الكهربائية','Compare cars':'قارن السيارات','Featured electric cars':'سيارات كهربائية مميزة','Find an EV':'ابحث عن سيارة كهربائية','Compare EVs':'قارن السيارات الكهربائية','Read reviews':'اقرأ المراجعات','Latest EV insights':'أحدث معلومات السيارات الكهربائية','Recent EV reviews.':'أحدث مراجعات السيارات الكهربائية','Global coverage':'تغطية عالمية','Ready to compare?':'هل أنت مستعد للمقارنة؟','Pick the EV that fits your life.':'اختر السيارة الكهربائية المناسبة لحياتك.','Explore EVs →':'استكشف السيارات الكهربائية →','Open comparison studio →':'افتح أداة المقارنة →','All brands':'كل العلامات','Catalog':'الكتالوج','Manufacturers':'الشركات المصنعة','Explore EV brands.':'استكشف علامات السيارات الكهربائية','EV knowledge':'معرفة السيارات الكهربائية','EV knowledge hub':'مركز معرفة السيارات الكهربائية','EV ownership tool':'أداة ملكية السيارة الكهربائية','Charging cost calculator.':'حاسبة تكلفة الشحن'}
// };

// const rates={USD:1,EUR:.92,GBP:.78,INR:83.5,AED:3.67,CAD:1.37,AUD:1.52,JPY:148,CNY:7.18,KRW:1350,CHF:.88,SEK:10.5,NOK:10.8,NZD:1.66,SGD:1.34,SAR:3.75,ZAR:18.2,BRL:5.5,MXN:18.5,THB:35.5};
// const I18nContext=createContext(null);
// export function I18nProvider({children}){
//  const [language,setLanguageState]=useState(DEFAULT_LANGUAGE); const [currency,setCurrencyState]=useState(DEFAULT_CURRENCY);
//  useEffect(()=>{const l=localStorage.getItem('evinsights-language');const c=localStorage.getItem('evinsights-currency');if(l&&LANGUAGES.some(x=>x.code===l))setLanguageState(l);if(c&&CURRENCIES.some(x=>x.code===c))setCurrencyState(c);},[]);
//  useEffect(()=>{document.documentElement.lang=language;document.documentElement.dir=language==='ar'?'rtl':'ltr';},[language]);
//  const setLanguage=v=>{setLanguageState(v);localStorage.setItem('evinsights-language',v);}; const setCurrency=v=>{setCurrencyState(v);localStorage.setItem('evinsights-currency',v);};
//  const t=(key)=>DICT[language]?.[key]??DICT.en[key]??key;
//  const convert=(amount,from='USD',to=currency)=>{const usd=from==='USD'?Number(amount):Number(amount)/(rates[from]||1);return usd*(rates[to]||1);};
//  const money=(amount, originalCurrency='USD')=>{const value=convert(amount,originalCurrency,currency);try{return new Intl.NumberFormat(language==='hi'?'hi-IN':language, {style:'currency',currency,maximumFractionDigits:0}).format(value)}catch{return `${currencyMeta(currency).symbol}${Math.round(value).toLocaleString()}`}};
//  const value=useMemo(()=>({language,currency,setLanguage,setCurrency,t,money,convert}),[language,currency]); return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
// }
// export function useGlobalPreferences(){return useContext(I18nContext);}
// export function getTranslations(code='en'){return DICT[code]||DICT.en;}
// export function getTranslationMap(code='en'){return {...(EXTRA.en||{}),...(UI_OVERLAY.en||{}),...(UI_MORE.en||{}),...(DICT.en||{}),...(EXTRA[code]||{}),...(UI_OVERLAY[code]||{}),...(UI_MORE[code]||{}),...(DICT[code]||{})};}



"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  CURRENCIES,
  DEFAULT_CURRENCY,
  DEFAULT_LANGUAGE,
  LANGUAGES,
  currencyMeta,
} from "@/config/global-markets";

/* =========================================================
   TRANSLATIONS
========================================================= */

const DICT = {
  en: {
    cars: "Cars",
    compare: "Compare",
    reviews: "Reviews",
    articles: "Articles",
    guides: "Guides",
    news: "News",
    search: "Search cars, brands, models…",

    overview: "Overview",
    variants: "Variants",
    specs: "Specs",
    charging: "Charging",
    features: "Features",
    safety: "Safety",
    gallery: "Gallery",

    starting: "Starting from",
    range: "Max Range (WLTP)",
    accel: "0–100 km/h",

    compareBtn: "Compare",
    availability: "Check Availability",
    save: "Save",

    highlights: "Key Highlights",
    pricing: "Variants & Pricing",
    chargingTitle: "Charging",
    specifications: "Specifications",
    dimensions: "Dimensions",
    safetyTitle: "Safety",
    markets: "Market Availability",

    reviewsCount: "reviews",

    battery: "Battery",
    power: "Power",
    topSpeed: "Top Speed",
    seats: "Seating",
    driveType: "Drive Type",

    viewAll: "View all variants",
    chargingGuide: "View charging guide",
    fullSpecs: "View full specs",
    safetyDetails: "View safety details",

    latestReview: "Latest Review",
    articlesTitle: "Articles",
    similar: "Similar EVs",
    sources: "Sources",
    verified: "Verified",

    electricSuv: "Electric SUV",
    electricVehicle: "Electric vehicle",

    notPublished: "Not published",
    readReview: "Read review",
    viewArticle: "Read article",

    home: "Home",
    carsCrumb: "Cars",

    demoNote:
      "Demo dataset — verify current local pricing and specifications before purchase.",

    /* Home */
    electricVehicleIntelligence: "Electric vehicle intelligence",
    knowTheEv: "Know the EV before you buy it.",
    exploreAllEvs: "Explore all EVs",
    compareCars: "Compare cars",
    sourceBacked: "Source-backed",
    globalMarkets: "Global markets",
    manualEditorialData: "Manual editorial data",
    discover: "Discover",

    featuredElectricCars: "Featured electric cars",
    viewAllArrow: "View all →",

    exploreByNeed: "Explore by need",
    everythingAroundDecision: "Everything around the EV decision.",

    findAnEv: "Find an EV",
    compareEvs: "Compare EVs",
    readReviews: "Read reviews",
    learnEvs: "Learn EVs",

    whyEvInsights: "Why EVInsights",
    builtForBetterDecisions: "Built for better EV decisions.",

    sourceBackedFacts: "Source-backed facts",
    oneCompleteVehiclePage: "One complete vehicle page",
    globalReadyStructure: "Global-ready structure",

    readAndLearn: "Read & learn",
    latestEvInsights: "Latest EV insights",

    communityVoice: "Community voice",
    recentEvReviews: "Recent EV reviews.",

    globalCoverage: "Global coverage",
    builtToGrow: "Built to grow across markets.",

    readyToCompare: "Ready to compare?",
    pickEvFitsLife: "Pick the EV that fits your life.",

    exploreEvsArrow: "Explore EVs →",
    openComparisonStudio: "Open comparison studio →",

    evDirectory: "EV directory",
    electricCarsProperlyOrganized: "Electric cars, properly organized.",

    search: "Search",
    allBrands: "All brands",
    catalog: "Catalog",

    manufacturers: "Manufacturers",
    exploreEvBrands: "Explore EV brands.",

    evKnowledge: "EV knowledge",
    articlesExplainEvWorld: "Articles that explain the EV world.",

    evInsightsReviews: "EVInsights reviews",
    reviewsTraceableData: "Reviews built from traceable data.",

    evKnowledgeHub: "EV knowledge hub",
    guidesForBuyers:
      "Guides for first-time and experienced EV buyers.",

    evOwnershipTool: "EV ownership tool",
    chargingCostCalculator: "Charging cost calculator.",

    openVehicle: "Open vehicle →",
    viewDetails: "View details",
    exploreTools: "Explore tools →",

    electricCars: "Electric cars",
    evGuides: "EV guides",

    explore: "Explore",
    learn: "Learn",

    somethingWentWrong: "Something went wrong",
    temporaryProblem: "We hit a temporary problem.",
    tryAgain: "Try again",
    browseEvs: "Browse EVs",

    /* Generic */
    open: "Open",
    startingPrice: "Starting price",
    readArticle: "Read article",

    monthlyDistance: "Monthly distance (km)",
    efficiency: "Efficiency (kWh / 100 km)",
    electricityPrice: "Electricity price",
    estimatedMonthlyChargingCost:
      "Estimated monthly charging cost",
  },

  hi: {
    cars: "कारें",
    compare: "तुलना",
    reviews: "रिव्यू",
    articles: "आर्टिकल्स",
    guides: "गाइड्स",
    news: "न्यूज़",
    search: "कार, ब्रांड या मॉडल खोजें…",

    overview: "ओवरव्यू",
    variants: "वेरिएंट्स",
    specs: "स्पेक्स",
    charging: "चार्जिंग",
    features: "फीचर्स",
    safety: "सेफ्टी",
    gallery: "गैलरी",

    starting: "शुरुआती कीमत",
    range: "अधिकतम रेंज (WLTP)",
    accel: "0–100 किमी/घं.",

    compareBtn: "तुलना करें",
    availability: "उपलब्धता देखें",
    save: "सेव करें",

    highlights: "मुख्य खूबियाँ",
    pricing: "वेरिएंट्स और कीमत",
    chargingTitle: "चार्जिंग",
    specifications: "स्पेसिफिकेशन",
    dimensions: "डायमेंशन",
    safetyTitle: "सेफ्टी",
    markets: "मार्केट उपलब्धता",

    reviewsCount: "रिव्यू",

    battery: "बैटरी",
    power: "पावर",
    topSpeed: "टॉप स्पीड",
    seats: "सीटिंग",
    driveType: "ड्राइव टाइप",

    viewAll: "सभी वेरिएंट देखें",
    chargingGuide: "चार्जिंग गाइड देखें",
    fullSpecs: "पूरे स्पेक्स देखें",
    safetyDetails: "सेफ्टी डिटेल देखें",

    latestReview: "नवीनतम रिव्यू",
    articlesTitle: "आर्टिकल्स",
    similar: "मिलती-जुलती EVs",
    sources: "सोर्सेज",
    verified: "वेरिफाइड",

    electricSuv: "इलेक्ट्रिक SUV",
    electricVehicle: "इलेक्ट्रिक वाहन",

    notPublished: "उपलब्ध नहीं",
    readReview: "रिव्यू पढ़ें",
    viewArticle: "आर्टिकल पढ़ें",

    home: "होम",
    carsCrumb: "कारें",

    demoNote:
      "डेमो डेटा — खरीदने से पहले स्थानीय कीमत और स्पेसिफिकेशन सत्यापित करें।",

    electricVehicleIntelligence: "इलेक्ट्रिक वाहन इंटेलिजेंस",
    knowTheEv: "खरीदने से पहले EV को जानें।",
    exploreAllEvs: "सभी EV देखें",
    compareCars: "कारों की तुलना करें",
    sourceBacked: "सोर्स-बैक्ड",
    globalMarkets: "ग्लोबल मार्केट्स",
    manualEditorialData: "मैनुअल एडिटोरियल डेटा",
    discover: "डिस्कवर",

    featuredElectricCars: "फीचर्ड इलेक्ट्रिक कारें",
    viewAllArrow: "सभी देखें →",

    exploreByNeed: "ज़रूरत के अनुसार देखें",
    everythingAroundDecision: "EV खरीद के फैसले की हर जानकारी।",

    findAnEv: "EV खोजें",
    compareEvs: "EVs की तुलना करें",
    readReviews: "रिव्यू पढ़ें",
    learnEvs: "EVs सीखें",

    whyEvInsights: "EVInsights क्यों",
    builtForBetterDecisions: "बेहतर EV फैसलों के लिए बनाया गया।",

    sourceBackedFacts: "सोर्स-बैक्ड तथ्य",
    oneCompleteVehiclePage: "एक पूरा वाहन पेज",
    globalReadyStructure: "ग्लोबल-रेडी स्ट्रक्चर",

    readAndLearn: "पढ़ें और सीखें",
    latestEvInsights: "नवीनतम EV जानकारी",

    communityVoice: "कम्युनिटी की राय",
    recentEvReviews: "हाल के EV रिव्यू।",

    globalCoverage: "ग्लोबल कवरेज",
    builtToGrow: "अलग-अलग मार्केट के लिए तैयार।",

    readyToCompare: "तुलना के लिए तैयार?",
    pickEvFitsLife: "अपने जीवन के लिए सही EV चुनें।",

    exploreEvsArrow: "EVs देखें →",
    openComparisonStudio: "तुलना स्टूडियो खोलें →",

    evDirectory: "EV डायरेक्टरी",
    electricCarsProperlyOrganized:
      "इलेक्ट्रिक कारें, व्यवस्थित तरीके से।",

    allBrands: "सभी ब्रांड",
    catalog: "कैटलॉग",

    manufacturers: "निर्माता",
    exploreEvBrands: "EV ब्रांड देखें।",

    evKnowledge: "EV ज्ञान",
    articlesExplainEvWorld:
      "EV दुनिया समझाने वाले आर्टिकल्स।",

    evInsightsReviews: "EVInsights रिव्यू",
    reviewsTraceableData:
      "ट्रेस करने योग्य डेटा पर आधारित रिव्यू।",

    evKnowledgeHub: "EV नॉलेज हब",
    guidesForBuyers:
      "नए और अनुभवी EV खरीदारों के लिए गाइड।",

    evOwnershipTool: "EV ओनरशिप टूल",
    chargingCostCalculator:
      "चार्जिंग कॉस्ट कैलकुलेटर।",

    openVehicle: "वाहन खोलें →",
    viewDetails: "डिटेल देखें",
    exploreTools: "टूल्स देखें →",

    electricCars: "इलेक्ट्रिक कारें",
    evGuides: "EV गाइड्स",

    explore: "एक्सप्लोर",
    learn: "सीखें",

    somethingWentWrong: "कुछ गलत हो गया",
    temporaryProblem: "एक अस्थायी समस्या हुई।",
    tryAgain: "फिर कोशिश करें",
    browseEvs: "EVs ब्राउज़ करें",

    open: "खोलें",
    startingPrice: "शुरुआती कीमत",
    readArticle: "आर्टिकल पढ़ें",

    monthlyDistance: "मासिक दूरी (किमी)",
    efficiency: "दक्षता (kWh / 100 किमी)",
    electricityPrice: "बिजली की कीमत",
    estimatedMonthlyChargingCost:
      "अनुमानित मासिक चार्जिंग लागत",
  },
};

/* =========================================================
   FALLBACK TRANSLATIONS
   ========================================================= */

const FALLBACK = {
  es: {
    cars: "Coches",
    compare: "Comparar",
    reviews: "Reseñas",
    articles: "Artículos",
    guides: "Guías",
    news: "Noticias",
    overview: "Resumen",
    variants: "Versiones",
    specs: "Especificaciones",
    charging: "Carga",
    features: "Equipamiento",
    safety: "Seguridad",
    gallery: "Galería",
    starting: "Desde",
    range: "Autonomía máxima (WLTP)",
    battery: "Batería",
    power: "Potencia",
    home: "Inicio",
    carsCrumb: "Coches",
    compareBtn: "Comparar",
    availability: "Ver disponibilidad",
    save: "Guardar",
    electricVehicle: "Vehículo eléctrico",
    readReview: "Leer reseña",
    viewArticle: "Leer artículo",
    featuredElectricCars: "Coches eléctricos destacados",
    exploreAllEvs: "Explorar todos los EV",
    compareCars: "Comparar coches",
    findAnEv: "Encontrar un EV",
    readReviews: "Leer reseñas",
    explore: "Explorar",
    learn: "Aprender",
    allBrands: "Todas las marcas",
    catalog: "Catálogo",
  },

  fr: {
    cars: "Voitures",
    compare: "Comparer",
    reviews: "Avis",
    articles: "Articles",
    guides: "Guides",
    news: "Actualités",
    overview: "Aperçu",
    variants: "Versions",
    specs: "Spécifications",
    charging: "Recharge",
    features: "Équipements",
    safety: "Sécurité",
    gallery: "Galerie",
    starting: "À partir de",
    range: "Autonomie max. (WLTP)",
    battery: "Batterie",
    power: "Puissance",
    home: "Accueil",
    carsCrumb: "Voitures",
    compareBtn: "Comparer",
    availability: "Voir disponibilité",
    save: "Enregistrer",
    electricVehicle: "Véhicule électrique",
    readReview: "Lire l’avis",
    viewArticle: "Lire l’article",
    featuredElectricCars: "Véhicules électriques à la une",
    exploreAllEvs: "Explorer tous les VE",
    compareCars: "Comparer les voitures",
    findAnEv: "Trouver un VE",
    readReviews: "Lire les avis",
    explore: "Explorer",
    learn: "Apprendre",
    allBrands: "Toutes les marques",
    catalog: "Catalogue",
  },

  de: {
    cars: "Autos",
    compare: "Vergleichen",
    reviews: "Tests",
    articles: "Artikel",
    guides: "Ratgeber",
    news: "News",
    overview: "Übersicht",
    variants: "Varianten",
    specs: "Daten",
    charging: "Laden",
    features: "Ausstattung",
    safety: "Sicherheit",
    gallery: "Galerie",
    starting: "Ab",
    range: "Max. Reichweite (WLTP)",
    battery: "Batterie",
    power: "Leistung",
    home: "Startseite",
    carsCrumb: "Autos",
    compareBtn: "Vergleichen",
    availability: "Verfügbarkeit",
    save: "Speichern",
    electricVehicle: "Elektrofahrzeug",
    readReview: "Test lesen",
    viewArticle: "Artikel lesen",
    featuredElectricCars: "Ausgewählte Elektroautos",
    exploreAllEvs: "Alle EVs entdecken",
    compareCars: "Autos vergleichen",
    findAnEv: "EV finden",
    readReviews: "Tests lesen",
    explore: "Entdecken",
    learn: "Lernen",
    allBrands: "Alle Marken",
    catalog: "Katalog",
  },

  it: {
    cars: "Auto",
    compare: "Confronta",
    reviews: "Recensioni",
    articles: "Articoli",
    guides: "Guide",
    news: "Notizie",
    overview: "Panoramica",
    variants: "Versioni",
    specs: "Specifiche",
    charging: "Ricarica",
    features: "Dotazioni",
    safety: "Sicurezza",
    gallery: "Galleria",
    starting: "A partire da",
    range: "Autonomia max (WLTP)",
    battery: "Batteria",
    power: "Potenza",
    home: "Home",
    carsCrumb: "Auto",
    compareBtn: "Confronta",
    availability: "Vedi disponibilità",
    save: "Salva",
    electricVehicle: "Veicolo elettrico",
    readReview: "Leggi recensione",
    viewArticle: "Leggi articolo",
    featuredElectricCars: "Auto elettriche in evidenza",
    exploreAllEvs: "Esplora tutti gli EV",
    compareCars: "Confronta auto",
    findAnEv: "Trova un EV",
    readReviews: "Leggi recensioni",
    explore: "Esplora",
    learn: "Impara",
    allBrands: "Tutti i marchi",
    catalog: "Catalogo",
  },

  pt: {
    cars: "Carros",
    compare: "Comparar",
    reviews: "Avaliações",
    articles: "Artigos",
    guides: "Guias",
    news: "Notícias",
    overview: "Visão geral",
    variants: "Versões",
    specs: "Especificações",
    charging: "Carregamento",
    features: "Recursos",
    safety: "Segurança",
    gallery: "Galeria",
    starting: "A partir de",
    range: "Autonomia máxima (WLTP)",
    battery: "Bateria",
    power: "Potência",
    home: "Início",
    carsCrumb: "Carros",
    compareBtn: "Comparar",
    availability: "Ver disponibilidade",
    save: "Salvar",
    electricVehicle: "Veículo elétrico",
    readReview: "Ler avaliação",
    viewArticle: "Ler artigo",
    featuredElectricCars: "Carros elétricos em destaque",
    exploreAllEvs: "Explorar todos os EVs",
    compareCars: "Comparar carros",
    findAnEv: "Encontrar um EV",
    readReviews: "Ler avaliações",
    explore: "Explorar",
    learn: "Aprender",
    allBrands: "Todas as marcas",
    catalog: "Catálogo",
  },

  ja: {
    cars: "車種",
    compare: "比較",
    reviews: "レビュー",
    articles: "記事",
    guides: "ガイド",
    news: "ニュース",
    overview: "概要",
    variants: "グレード",
    specs: "仕様",
    charging: "充電",
    features: "機能",
    safety: "安全性",
    gallery: "ギャラリー",
    starting: "価格",
    range: "最大航続距離 (WLTP)",
    battery: "バッテリー",
    power: "出力",
    home: "ホーム",
    carsCrumb: "車種",
    compareBtn: "比較する",
    availability: "在庫を見る",
    save: "保存",
    electricVehicle: "電気自動車",
    readReview: "レビューを読む",
    viewArticle: "記事を読む",
    featuredElectricCars: "注目の電気自動車",
    exploreAllEvs: "すべてのEVを見る",
    compareCars: "車を比較",
    findAnEv: "EVを探す",
    readReviews: "レビューを読む",
    explore: "探す",
    learn: "学ぶ",
    allBrands: "すべてのブランド",
    catalog: "カタログ",
  },

  ko: {
    cars: "차량",
    compare: "비교",
    reviews: "리뷰",
    articles: "기사",
    guides: "가이드",
    news: "뉴스",
    overview: "개요",
    variants: "트림",
    specs: "제원",
    charging: "충전",
    features: "기능",
    safety: "안전",
    gallery: "갤러리",
    starting: "시작 가격",
    range: "최대 주행거리 (WLTP)",
    battery: "배터리",
    power: "출력",
    home: "홈",
    carsCrumb: "차량",
    compareBtn: "비교",
    availability: "판매 여부",
    save: "저장",
    electricVehicle: "전기차",
    readReview: "리뷰 읽기",
    viewArticle: "기사 읽기",
    featuredElectricCars: "추천 전기차",
    exploreAllEvs: "모든 EV 보기",
    compareCars: "차량 비교",
    findAnEv: "EV 찾기",
    readReviews: "리뷰 읽기",
    explore: "탐색",
    learn: "학습",
    allBrands: "모든 브랜드",
    catalog: "카탈로그",
  },

  zh: {
    cars: "车型",
    compare: "对比",
    reviews: "评测",
    articles: "文章",
    guides: "指南",
    news: "新闻",
    overview: "概览",
    variants: "版本",
    specs: "参数",
    charging: "充电",
    features: "配置",
    safety: "安全",
    gallery: "图库",
    starting: "起售价",
    range: "最大续航 (WLTP)",
    battery: "电池",
    power: "功率",
    home: "首页",
    carsCrumb: "车型",
    compareBtn: "对比",
    availability: "查看可用性",
    save: "收藏",
    electricVehicle: "电动车",
    readReview: "阅读评测",
    viewArticle: "阅读文章",
    featuredElectricCars: "精选电动车",
    exploreAllEvs: "查看全部电动车",
    compareCars: "比较车型",
    findAnEv: "寻找电动车",
    readReviews: "阅读评测",
    explore: "探索",
    learn: "学习",
    allBrands: "全部品牌",
    catalog: "目录",
  },

  ar: {
    cars: "السيارات",
    compare: "مقارنة",
    reviews: "المراجعات",
    articles: "المقالات",
    guides: "الأدلة",
    news: "الأخبار",
    overview: "نظرة عامة",
    variants: "الفئات",
    specs: "المواصفات",
    charging: "الشحن",
    features: "المزايا",
    safety: "السلامة",
    gallery: "المعرض",
    starting: "تبدأ من",
    range: "أقصى مدى (WLTP)",
    battery: "البطارية",
    power: "القوة",
    home: "الرئيسية",
    carsCrumb: "السيارات",
    compareBtn: "قارن",
    availability: "تحقق من التوفر",
    save: "حفظ",
    electricVehicle: "سيارة كهربائية",
    readReview: "اقرأ المراجعة",
    viewArticle: "اقرأ المقال",
    featuredElectricCars: "سيارات كهربائية مميزة",
    exploreAllEvs: "استكشف جميع السيارات الكهربائية",
    compareCars: "قارن السيارات",
    findAnEv: "ابحث عن سيارة كهربائية",
    readReviews: "اقرأ المراجعات",
    explore: "استكشف",
    learn: "تعلّم",
    allBrands: "كل العلامات",
    catalog: "الكتالوج",
  },
};

/* =========================================================
   CURRENCY RATES
========================================================= */

const rates = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.78,
  INR: 83.5,
  AED: 3.67,
  CAD: 1.37,
  AUD: 1.52,
  JPY: 148,
  CNY: 7.18,
  KRW: 1350,
  CHF: 0.88,
  SEK: 10.5,
  NOK: 10.8,
  NZD: 1.66,
  SGD: 1.34,
  SAR: 3.75,
  ZAR: 18.2,
  BRL: 5.5,
  MXN: 18.5,
  THB: 35.5,
};

/* =========================================================
   CONTEXT
========================================================= */

const I18nContext = createContext(null);

/* =========================================================
   PROVIDER
========================================================= */

export function I18nProvider({ children }) {
  const [language, setLanguageState] = useState(DEFAULT_LANGUAGE);
  const [currency, setCurrencyState] = useState(DEFAULT_CURRENCY);

  /* Load saved preferences */

  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem(
        "evinsights-language"
      );

      const savedCurrency = localStorage.getItem(
        "evinsights-currency"
      );

      if (
        savedLanguage &&
        LANGUAGES.some(
          (item) => item.code === savedLanguage
        )
      ) {
        setLanguageState(savedLanguage);
      }

      if (
        savedCurrency &&
        CURRENCIES.some(
          (item) => item.code === savedCurrency
        )
      ) {
        setCurrencyState(savedCurrency);
      }
    } catch {
      // localStorage may be unavailable
    }
  }, []);

  /* Update HTML language and direction */

  useEffect(() => {
    if (typeof document === "undefined") return;

    document.documentElement.lang = language;

    document.documentElement.dir =
      language === "ar" ? "rtl" : "ltr";
  }, [language]);

  /* =======================================================
     LANGUAGE
  ======================================================= */

  const setLanguage = (value) => {
    if (
      !LANGUAGES.some(
        (item) => item.code === value
      )
    ) {
      return;
    }

    setLanguageState(value);

    try {
      localStorage.setItem(
        "evinsights-language",
        value
      );
    } catch {
      // ignore storage errors
    }

    if (typeof document !== "undefined") {
      document.documentElement.lang = value;

      document.documentElement.dir =
        value === "ar" ? "rtl" : "ltr";
    }
  };

  /* =======================================================
     CURRENCY
  ======================================================= */

  const setCurrency = (value) => {
    if (
      !CURRENCIES.some(
        (item) => item.code === value
      )
    ) {
      return;
    }

    setCurrencyState(value);

    try {
      localStorage.setItem(
        "evinsights-currency",
        value
      );
    } catch {
      // ignore storage errors
    }
  };

  /* =======================================================
     TRANSLATION FUNCTION
  ======================================================= */

  const t = (key) => {
    const currentLanguage =
      DICT[language] || FALLBACK[language];

    return (
      currentLanguage?.[key] ??
      DICT.en?.[key] ??
      key
    );
  };

  /* =======================================================
     CURRENCY CONVERSION
  ======================================================= */

  const convert = (
    amount,
    from = "USD",
    to = currency
  ) => {
    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount)) {
      return 0;
    }

    const fromRate =
      rates[from] || 1;

    const toRate =
      rates[to] || 1;

    const usd =
      from === "USD"
        ? numericAmount
        : numericAmount / fromRate;

    return usd * toRate;
  };

  /* =======================================================
     MONEY FORMATTER
  ======================================================= */

  const money = (
    amount,
    originalCurrency = "USD"
  ) => {
    const value = convert(
      amount,
      originalCurrency,
      currency
    );

    try {
      const localeMap = {
        en: "en-US",
        hi: "hi-IN",
        es: "es-ES",
        fr: "fr-FR",
        de: "de-DE",
        it: "it-IT",
        pt: "pt-PT",
        ja: "ja-JP",
        ko: "ko-KR",
        zh: "zh-CN",
        ar: "ar-SA",
      };

      return new Intl.NumberFormat(
        localeMap[language] || "en-US",
        {
          style: "currency",
          currency,
          maximumFractionDigits: 0,
        }
      ).format(value);
    } catch {
      const meta = currencyMeta(currency);

      return `${meta?.symbol || currency}${Math.round(
        value
      ).toLocaleString()}`;
    }
  };

  /* =======================================================
     CONTEXT VALUE
  ======================================================= */

  const contextValue = useMemo(
    () => ({
      language,
      currency,

      setLanguage,
      setCurrency,

      t,
      money,
      convert,
    }),
    [language, currency]
  );

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  );
}

/* =========================================================
   HOOK
========================================================= */

export function useGlobalPreferences() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error(
      "useGlobalPreferences must be used inside I18nProvider"
    );
  }

  return context;
}

/* =========================================================
   SERVER / STATIC HELPERS
========================================================= */

export function getTranslations(code = "en") {
  return (
    DICT[code] ||
    FALLBACK[code] ||
    DICT.en
  );
}

export function getTranslationMap(code = "en") {
  return {
    ...(DICT.en || {}),
    ...(FALLBACK[code] || {}),
    ...(DICT[code] || {}),
  };
}