// Stock Mail
export interface StockMail {
  id: number;
  email: string;
  password: string;
  device: string;
  status: string;
  handler: string;
  assign: string;
}

export const sampleStockMails: StockMail[] = [
  { id: 1, email: 'jyehua7@gmail.com', password: 'A123456A', device: '7', status: 'USING', assign: 'INTERNAL', handler: 'YULITA' },
  { id: 2, email: 'siopielyn@gmail.com', password: 'AAaa1234', device: 'F104', status: 'USING', assign: 'INTERNAL', handler: 'YULITA' },
  { id: 3, email: 'giokrinot@gmail.com', password: 'A123456A', device: 'F26', status: 'USING', assign: 'INTERNAL', handler: 'YULITA' },
  { id: 4, email: 'pikpikkoy4@gmail.com', password: 'AAaa1234', device: 'Q141', status: 'USING', assign: 'EXTERNAL', handler: 'YULITA' },
  { id: 5, email: 'babonjulb@gmail.com', password: 'A123456A', device: 'F49', status: 'USING', assign: 'EXTERNAL', handler: 'YULITA' },
  { id: 6, email: 'dilthoba@gmail.com', password: 'AAaa1234', device: 'F02', status: 'USING', assign: 'EXTERNAL', handler: 'YULITA' },
  { id: 7, email: 'amitimut706@gmail.com', password: 'A123456A', device: 'Q118', status: 'USING', assign: 'EXTERNAL', handler: 'YULITA' },
  { id: 8, email: 'zstevenmorganz88@gmail.com', password: 'AAaa1234@', device: 'F83', status: 'USING', assign: 'INTERNAL', handler: 'YULITA' },
  { id: 9, email: 'redwhiteflag88@gmail.com', password: 'AAaa1234@', device: 'F117', status: 'USING', assign: 'EXTERNAL', handler: 'YULITA' },
  { id: 10, email: 'alingjiejie88@gmail.com', password: 'AAaa1234@', device: 'Q159', status: 'USING', assign: 'EXTERNAL', handler: 'YULITA' },
  { id: 11, email: 'blackgreenz66@gmail.com', password: 'AAaa1234@', device: 'F117', status: 'USING', assign: 'INTERNAL', handler: 'YULITA' },
  { id: 12, email: 'wikmik352@gmail.com', password: 'A123456A', device: 'F59', status: 'USING', assign: 'EXTERNAL', handler: 'YULITA' },
  { id: 13, email: 'lelelicious38@gmail.com', password: 'AAaa1234@', device: 'Q138', status: 'NEED VERIFY', assign: 'EXTERNAL', handler: 'YULITA' },
  { id: 14, email: 'pompomgrates@gmail.com', password: 'AAaa1234@', device: 'F58', status: 'USING', assign: 'INTERNAL', handler: 'ERIC' },
  { id: 15, email: 'extrabright99@gmail.com', password: 'AAaa1234@', device: 'F31', status: 'USING', assign: '', handler: '' },
  { id: 16, email: 'melvinzstore@gmail.com', password: 'AAaa1234@', device: 'Q159', status: 'USING', assign: 'INTERNAL', handler: 'ERIC' },
  { id: 17, email: 'elizabethpoppy89@gmail.com', password: 'AAaa1234@', device: 'F115', status: 'USING', assign: 'INTERNAL', handler: 'ERIC' },
  { id: 18, email: 'lunafellprincess@gmail.com', password: 'AAaa1234@', device: 'F115', status: 'USING', assign: 'INTERNAL', handler: 'ERIC' },
  { id: 19, email: 'bossdaemon95@gmail.com', password: 'AAaa1234@', device: 'F128', status: 'USING', assign: 'INTERNAL', handler: 'ERIC' },
  { id: 20, email: 'cloudsparty68@gmail.com', password: 'AAaa1234##', device: 'F122', status: 'NEED VERIFY', assign: 'INTERNAL', handler: 'ERIC' },
  { id: 21, email: 'squareheart35@gmail.com', password: 'AAaa1234@', device: 'F118', status: 'USING', assign: 'EXTERNAL', handler: 'ERIC' },
  { id: 22, email: 'hasanaparcel@gmail.com', password: 'AAaa1234', device: 'F110', status: 'USING', assign: 'EXTERNAL', handler: 'ERIC' },
  { id: 23, email: 'muhammadhuseinn0101@gmail.com', password: 'AAaa1234', device: 'Q163', status: 'USING', assign: 'INTERNAL', handler: 'ERIC' },
  { id: 24, email: 'bastianrichard577@gmail.com', password: 'AAaa1234', device: 'F07', status: 'USING', assign: 'EXTERNAL', handler: 'ERIC' },
  { id: 25, email: 'rexaanugrah566@gmail.com', password: 'AAaa1234', device: 'F43', status: 'USING', assign: 'INTERNAL', handler: 'ERIC' },
  { id: 26, email: 'rizalpahlevii1122@gmail.com', password: 'AAaa1234', device: 'F33', status: 'USING', assign: 'INTERNAL', handler: 'ERIC' },
  { id: 27, email: 'gyao5430@gmail.com', password: 'AAaa1234@', device: 'F39', status: 'USING', assign: 'EXTERNAL', handler: 'ERIC' },
  { id: 28, email: 'ericchey510@gmail.com', password: 'AAaa1234@', device: 'F39', status: 'USING', assign: 'EXTERNAL', handler: 'ERIC' },
  { id: 29, email: 'ahliebeek@gmail.com', password: 'AAaa1234@', device: 'F69', status: 'USING', assign: 'EXTERNAL', handler: 'ERIC' },
  { id: 30, email: 'jiauweiya@gmail.com', password: 'AAaa1234@', device: 'F122', status: 'NEED VERIFY', assign: 'INTERNAL', handler: 'ERIC' },
  { id: 31, email: 'tiaozhun22@gmail.com', password: 'AAaa1234@', device: 'F127', status: 'USING', assign: 'EXTERNAL', handler: 'ERIC' },
  { id: 32, email: 'zheelingling21@gmail.com', password: 'AAaa1234@', device: 'F127', status: 'USING', assign: 'EXTERNAL', handler: 'ERIC' },
  { id: 33, email: 'bunleezhao@gmail.com', password: 'AAaa1234@', device: 'F127', status: 'USING', assign: 'EXTERNAL', handler: 'ERIC' },
  { id: 34, email: 'gyatleelee@gmail.com', password: 'AAaa1234@', device: 'F128', status: 'USING', assign: 'INTERNAL', handler: 'ERIC' },
  { id: 35, email: 'yaomingchey@gmail.com', password: 'AAaa1234', device: 'F128', status: 'USING', assign: 'INTERNAL', handler: 'ERIC' },
  { id: 36, email: 'loanghaohao@gmail.com', password: 'AAaa1234@', device: 'F128', status: 'USING', assign: 'INTERNAL', handler: 'ERIC' },
  { id: 37, email: 'rawenleetzao@gmail.com', password: 'AAaa1234@', device: 'F118', status: 'USING', assign: 'EXTERNAL', handler: 'ERIC' },
  { id: 38, email: 'jiaozhangli91@gmail.com', password: 'AAaa1234@', device: 'F118', status: 'USING', assign: 'EXTERNAL', handler: 'ERIC' },
  { id: 39, email: 'niccsodoktrarawr@gmail.com', password: 'AAaa1233', device: 'F77', status: 'USING', assign: 'EXTERNAL', handler: 'ERIC' },
  { id: 40, email: 'erlianashui@gmail.com', password: 'AAaa1234@', device: 'F118', status: 'USING', assign: 'EXTERNAL', handler: 'ERIC' },
  { id: 41, email: 'lintaochey@gmail.com', password: 'AAaa1234@', device: 'F120', status: 'USING', assign: 'EXTERNAL', handler: 'ERIC' },
  { id: 42, email: 'zhenbaula@gmail.com', password: 'AAaa1234@', device: 'F52', status: 'USING', assign: 'EXTERNAL', handler: 'ERIC' },
  { id: 43, email: 'yucheegarry@gmail.com', password: 'AAaa1234@', device: 'F52', status: 'USING', assign: 'EXTERNAL', handler: 'ERIC' },
  { id: 44, email: 'taobanliuyang@gmail.com', password: 'AAaa1234@', device: 'F52', status: 'USING', assign: 'EXTERNAL', handler: 'ERIC' },
  { id: 45, email: 'erikacheyernia@gmail.com', password: 'AAaa1234@', device: 'F52', status: 'USING', assign: 'EXTERNAL', handler: 'ERIC' },
  { id: 46, email: 'khaniatai745@gmail.com', password: 'AAaa1234@', device: 'F73', status: 'USING', assign: 'EXTERNAL', handler: 'ERIC' },
  { id: 47, email: 'yaobintaobao@gmail.com', password: 'AAaa1234@', device: 'F73', status: 'USING', assign: 'EXTERNAL', handler: 'ERIC' },
  { id: 48, email: 'tyalwenjie@gmail.com', password: 'AAaa1234@', device: 'F73', status: 'USING', assign: 'EXTERNAL', handler: 'ERIC' },
  { id: 49, email: 'yinghaobi3@gmail.com', password: 'AAaa1234@', device: 'F54', status: 'USING', assign: 'EXTERNAL', handler: 'ERIC' },
  { id: 50, email: 'yuliracha05@gmail.com', password: 'AAaa1234@', device: 'F54', status: 'USING', assign: 'EXTERNAL', handler: 'ERIC' },
  { id: 51, email: 'sinjasammy79@gmail.com', password: 'AAaa1234@', device: 'F54', status: 'USING', assign: 'EXTERNAL', handler: 'ERIC' },
  { id: 52, email: 'dziuralexa@gmail.com', password: 'AAaa1234@', device: 'F54', status: 'USING', assign: 'EXTERNAL', handler: 'ERIC' },
  { id: 53, email: 'yaluyaliana@gmail.com', password: 'AAaa1234@', device: 'Q133', status: 'USING', assign: 'EXTERNAL', handler: 'ERIC' },
  { id: 54, email: 'tyalraihan@gmail.com', password: 'AAaa1234@', device: 'F31', status: 'USING', assign: 'EXTERNAL', handler: 'ERIC' },
  { id: 55, email: 'marimarimas97@gmail.com', password: 'AAaa1234@', device: 'Q162', status: 'NEED VERIFY', assign: '', handler: 'ERIC' },
  { id: 56, email: 'jennababy956@gmail.com', password: 'AAaa1234@', device: 'F79', status: 'USING', assign: 'INTERNAL', handler: 'ERIC' },
  { id: 57, email: 'kenukeanu9@gmail.com', password: 'AAaa1234@', device: 'F79', status: 'USING', assign: '', handler: 'ERIC' },
  { id: 58, email: 'pamungkassadewa13@gmail.com', password: 'AAaa1234@', device: 'F79', status: 'NEED VERIFY', assign: '', handler: 'ERIC' },
  { id: 59, email: 'matchalattebites88@gmail.com', password: 'AAaa1234@', device: 'F79', status: 'USING', assign: 'INTERNAL', handler: 'ERIC' },
  { id: 60, email: 'hadidbellas194@gmail.com', password: 'AAaa1234@', device: 'F79', status: 'USING', assign: 'EXTERNAL', handler: 'ERIC' },
  { id: 61, email: 'abigailgracias88@gmail.com', password: 'AAaa1234@', device: 'F104', status: 'USING', assign: 'EXTERNAL', handler: 'ERIC' },
  { id: 62, email: 'minghaobabe98@gmail.com', password: 'AAaa1234@', device: 'F104', status: 'USING', assign: 'EXTERNAL', handler: 'ERIC' },
  { id: 63, email: 'dedelinna89@gmail.com', password: 'AAaa1234@', device: 'F104', status: 'USING', assign: 'EXTERNAL', handler: 'ERIC' },
  { id: 64, email: 'tangyu285@gmail.com', password: 'AAaa1234@', device: 'F104', status: 'USING', assign: 'EXTERNAL', handler: 'ERIC' },
  { id: 65, email: 'annejocelyn96@gmail.com', password: 'AAaa1234@', device: 'F63', status: 'USING', assign: 'EXTERNAL', handler: 'ERIC' },
  { id: 66, email: 'charisbridget2@gmail.com', password: 'AAaa1234@', device: 'F43', status: 'USING', assign: 'EXTERNAL', handler: 'ERIC' },
  { id: 67, email: 'elleanorella95@gmail.com', password: 'AAaa1234@', device: 'F43', status: 'USING', assign: 'INTERNAL', handler: 'ERIC' },
  { id: 68, email: 'gemmagwen87@gmail.com', password: 'AAaa1234@', device: 'F43', status: 'NEED VERIFY', assign: '', handler: 'ERIC' },
  { id: 69, email: 'helenhilary51@gmail.com', password: 'AAaa1234@', device: 'F43', status: 'NEED VERIFY', assign: '', handler: '' },
  { id: 70, email: 'izumiixora@gmail.com', password: 'AAaa1234@', device: 'F43', status: 'NEED VERIFY', assign: '', handler: 'ERIC' },
  { id: 71, email: 'joycejudith73@gmail.com', password: 'AAaa1234@', device: 'F70', status: 'USING', assign: '', handler: 'ERIC' },
  { id: 72, email: 'odetteolympia98@gmail.com', password: 'AAaa1234@', device: 'F70', status: 'USING', assign: '', handler: 'ERIC' },
  { id: 73, email: 'ozarapetra@gmail.com', password: 'AAaa1234@', device: 'F70', status: 'USING', assign: '', handler: 'ERIC' },
  { id: 74, email: 'theodoratara36@gmail.com', password: 'AAaa1234@', device: 'F98', status: 'USING', assign: 'INTERNAL', handler: 'ERIC' },
  { id: 75, email: 'tianatheresa94@gmail.com', password: 'AAaa1234@', device: 'F98', status: 'NEED VERIFY', assign: '', handler: 'ERIC' },
  { id: 76, email: 'yarayuki97@gmail.com', password: 'AAaa1234@', device: 'F98', status: 'USING', assign: 'EXTERNAL', handler: 'ERIC' },
  { id: 77, email: 'alisonaimee88@gmail.com', password: 'AAaa1234@', device: 'F98', status: 'USING', assign: 'EXTERNAL', handler: 'REBECCA' },
  { id: 78, email: 'claireciara734@gmail.com', password: 'AAaa1234@', device: 'F98', status: 'USING', assign: 'EXTERNAL', handler: 'REBECCA' },
  { id: 79, email: 'cleocora88@gmail.com', password: 'AAaa1234@', device: 'F102', status: 'USING', assign: 'INTERNAL', handler: 'ERIC' },
  { id: 80, email: 'carmencyra22@gmail.com', password: 'AAaa1234@', device: 'F102', status: 'USING', assign: 'INTERNAL', handler: 'REBECCA' },
  { id: 81, email: 'crystalcaleste@gmail.com', password: 'AAaa1234@', device: 'F102', status: 'USING', assign: 'EXTERNAL', handler: 'REBECCA' },
  { id: 82, email: 'dorothydoris99@gmail.com', password: 'AAaa1234@', device: 'F102', status: 'USING', assign: '', handler: '' },
  { id: 83, email: 'daynadawn132@gmail.com', password: 'AAaa1234@', device: 'F102', status: 'USING', assign: '', handler: '' },
  { id: 84, email: 'maverickmiles28@gmail.com', password: 'AAaa1234@', device: 'F45', status: 'USING', assign: 'INTERNAL', handler: 'ERIC' },
  { id: 85, email: 'kaitheo060@gmail.com', password: 'Aabb2255@', device: 'Q138', status: 'USING', assign: 'INTERNAL', handler: 'ERIC' },
  { id: 86, email: 'axelaaron043@gmail.com', password: 'AAaa1234@', device: 'Q138', status: 'USING', assign: 'INTERNAL', handler: 'ERIC' },
  { id: 87, email: 'jeremiaheli31@gmail.com', password: 'AAaa1234@', device: 'Q138', status: 'USING', assign: '', handler: 'ERIC' },
  { id: 88, email: 'jluca3651@gmail.com', password: 'AAaa1234@', device: 'Q138', status: 'USING', assign: 'INTERNAL', handler: 'ERIC' },
  { id: 89, email: 'grahamhuntr99@gmail.com', password: 'AAaa1234@', device: 'F60', status: 'USING', assign: 'INTERNAL', handler: 'ERIC' },
  { id: 90, email: 'ivanhayden071@gmail.com', password: 'AAaa1234@', device: 'Q133', status: 'USING', assign: 'INTERNAL', handler: 'ERIC' },
  { id: 91, email: 'emiliozion16@gmail.com', password: 'AAaa1234@', device: 'Q133', status: 'USING', assign: 'INTERNAL', handler: 'ERIC' },
  { id: 92, email: 'malachiarlo61@gmail.com', password: 'AAaa1234@', device: 'Q133', status: 'USING', assign: 'INTERNAL', handler: 'ERIC' },
  { id: 93, email: 'cadenaiden09@gmail.com', password: 'AAaa1234@', device: '7', status: 'USING', assign: 'INTERNAL', handler: 'ERIC' },
  { id: 94, email: 'jstntucker97@gmail.com', password: 'AAaa1234@', device: 'Q141', status: 'USING', assign: 'INTERNAL', handler: 'ERIC' },
  { id: 95, email: 'kvntatum01@gmail.com', password: 'AAaa1234@', device: 'Q141', status: 'USING', assign: '', handler: '' },
  { id: 96, email: 'timothykaiden09@gmail.com', password: 'AAaa1234@', device: 'Q141', status: 'USING', assign: 'EXTERNAL', handler: 'ERIC' },
  { id: 97, email: 'joelabel081@gmail.com', password: 'AAaa1234@', device: 'F47', status: 'USING', assign: 'EXTERNAL', handler: 'ERIC' },
  { id: 98, email: 'brodyg153@gmail.com', password: 'AAaa1234@', device: 'F47', status: 'USING', assign: 'INTERNAL', handler: 'ERIC' },
  { id: 99, email: 'rileyeithan69@gmail.com', password: 'AAaa1234@', device: 'F47', status: 'USING', assign: 'EXTERNAL', handler: 'ERIC' },
  { id: 100, email: 'colterxander43@gmail.com', password: 'AAaa1234@', device: 'F47', status: 'USING', assign: 'EXTERNAL', handler: 'ERIC' },
  { id: 101, email: 'victormaddox05@gmail.com', password: 'AAaa1234@', device: 'F47', status: 'USING', assign: '', handler: '' },
  { id: 102, email: 'andrewandrsn88@gmail.com', password: 'AAaa1234@', device: 'F127', status: 'USING', assign: 'INTERNAL', handler: 'ERIC' },
  { id: 103, email: 'prisqilatiara@gmail.com', password: 'AAaa1234@', device: 'F78', status: 'NEED VERIFY', assign: '', handler: '' },
  { id: 104, email: 'andinisarah491@gmail.com', password: 'AAaa1234@', device: 'F42', status: 'USING', assign: 'EXTERNAL', handler: 'ERIC' },
  { id: 105, email: 'yijinbaby6@gmail.com', password: 'AAaa1234@', device: 'F42', status: 'NEED VERIFY', assign: '', handler: '' },
  { id: 106, email: 'nktsarah33@gmail.com', password: 'AAaa1234@', device: 'F42', status: 'NEED VERIFY', assign: '', handler: '' },
  { id: 107, email: 'coffemocha20@gmail.com', password: 'AAaa1234@', device: 'F42', status: 'USING', assign: 'INTERNAL', handler: 'ERIC' },
  { id: 108, email: 'angelagilshah06@gmail.com', password: 'AAaa1234@', device: 'F70', status: 'USING', assign: 'EXTERNAL', handler: 'ERIC' },
  { id: 109, email: 'danielajesica63@gmail.com', password: 'AAaa1234@', device: 'F70', status: 'USING', assign: 'EXTERNAL', handler: 'ERIC' },
  { id: 110, email: 'ameliaamanlina@gmail.com', password: 'AAaa1234@', device: 'F58', status: 'USING', assign: 'INTERNAL', handler: 'ERIC' },
  { id: 111, email: 'firdausgerry6@gmail.com', password: 'AAaa1234@', device: 'F104', status: 'USING', assign: '', handler: '' },
  { id: 112, email: 'anitagadis44@gmail.com', password: 'AAaa1234@', device: 'F64', status: 'USING', assign: 'EXTERNAL', handler: 'ERIC' },
  { id: 113, email: 'saputrigladis33@gmail.com', password: 'AAaa1234@', device: 'F64', status: 'USING', assign: '', handler: '' },
  { id: 114, email: 'taromachiato190@gmail.com', password: 'AAaa1234@', device: 'F64', status: 'USING', assign: '', handler: '' },
  { id: 115, email: 'raniahendra6@gmail.com', password: 'danial@123', device: 'F107', status: 'USING', assign: 'EXTERNAL', handler: 'ERIC' },
  { id: 116, email: 'doublematcha37@gmail.com', password: 'AAaa1234@', device: 'F42', status: 'USING', assign: 'EXTERNAL', handler: 'ERIC' },
  { id: 117, email: 'babydiana994@gmail.com', password: 'AAaa1234@', device: 'F50', status: 'NEED VERIFY', assign: 'EXTERNAL', handler: 'REBECCA' },
  { id: 118, email: 'nadisanarendra@gmail.com', password: 'AAaa1234@', device: 'F50', status: 'NEED VERIFY', assign: '', handler: '' },
  { id: 119, email: 'suryaprakas290@gmail.com', password: 'AAaa1234@', device: 'F50', status: 'NEED VERIFY', assign: '', handler: '' },
  { id: 120, email: 'swtcaramell55@gmail.com', password: 'AAaa1234@', device: 'F64', status: 'NEED VERIFY', assign: '', handler: '' },
  { id: 121, email: 'chocochipsdouble13@gmail.com', password: 'AAaa1234@', device: 'F64', status: 'NEED VERIFY', assign: '', handler: '' },
  { id: 122, email: 'deboranatania2@gmail.com', password: 'AAaa1234@', device: 'F45', status: 'NEED VERIFY', assign: '', handler: '' },
  { id: 123, email: 'dayendebo@gmail.com', password: 'AAaa1234@', device: 'F45', status: 'NEED VERIFY', assign: '', handler: '' },
  { id: 124, email: 'ericafabiola648@gmail.com', password: 'AAaa1234@', device: 'F45', status: 'NEED VERIFY', assign: '', handler: '' },
  { id: 125, email: 'denandraalvaro366@gmail.com', password: 'AAaa1234@', device: 'F78', status: 'NEED VERIFY', assign: '', handler: '' },
  { id: 126, email: 'syaifulipul394@gmail.com', password: 'AAaa1234@', device: 'F78', status: 'NEED VERIFY', assign: '', handler: '' },
  { id: 127, email: 'bzee17162@gmail.com', password: 'AAaa1234@', device: 'F78', status: 'NEED VERIFY', assign: '', handler: '' },
  { id: 128, email: 'cantikaabel371@gmail.com', password: 'AAaa1234@', device: 'F78', status: 'NEED VERIFY', assign: '', handler: '' },
  { id: 129, email: 'patriciasarahh66@gmail.com', password: 'AAaa1234@', device: 'F96', status: 'NEED VERIFY', assign: '', handler: '' },
  { id: 130, email: 'zeuszacheus9@gmail.com', password: 'AAaa1234@', device: 'F72', status: 'NEED VERIFY', assign: '', handler: '' },
  { id: 131, email: 'arapmklm55@gmail.com', password: 'AAaa1234@', device: 'F52', status: 'NEED VERIFY', assign: '', handler: '' },
  { id: 132, email: 'bagassptra320@gmail.com', password: 'AAaa1234@', device: 'F52', status: 'NEED VERIFY', assign: '', handler: '' },
  { id: 133, email: 'julianjule24@gmail.com', password: 'AAaa1234@', device: 'F52', status: 'NEED VERIFY', assign: '', handler: '' },
  { id: 134, email: 'ginagins760@gmail.com', password: 'AAaa1234@', device: 'F52', status: 'NEED VERIFY', assign: '', handler: '' },
  { id: 135, email: 'dilannarendra534@gmail.com', password: 'AAaa1234@', device: 'F73', status: 'NEW', assign: 'INTERNAL', handler: 'REBECCA' },
  { id: 136, email: 'spongebobkuning457@gmail.com', password: 'AAaa1234@', device: 'F73', status: 'USING', assign: '', handler: 'ERIC' },
  { id: 137, email: 'patrickpinkeu2@gmail.com', password: 'AAaa1234@', device: 'F73', status: 'NEW', assign: 'INTERNAL', handler: 'REBECCA' },
  { id: 138, email: 'andreassabatini72@gmail.com', password: 'AAaa1234@', device: 'F73', status: 'NEW', assign: 'INTERNAL', handler: 'REBECCA' },
  { id: 139, email: 'saipuljamill398@gmail.com', password: 'AAaa1234@', device: 'F72', status: 'NEW', assign: 'INTERNAL', handler: 'REBECCA' },
  { id: 140, email: 'bebepretty917@gmail.com', password: 'AAaa1234@', device: 'F72', status: 'NEW', assign: 'INTERNAL', handler: 'REBECCA' },
  { id: 141, email: 'oren19295@gmail.com', password: 'AAaa1234@', device: 'F72', status: 'USING', assign: 'INTERNAL', handler: 'YULITA' },
  { id: 142, email: 'zethajehan@gmail.com', password: 'AAaa1234@', device: 'F72', status: 'USING', assign: 'INTERNAL', handler: 'YULITA' },
  { id: 143, email: 'skyisbluee706@gmail.com', password: 'AAaa1234@', device: 'F52', status: 'USING', assign: 'INTERNAL', handler: 'YULITA' },
  { id: 144, email: 'ctineangel88@gmail.com', password: 'AAaa1234@', device: 'F45', status: 'USING', assign: 'INTERNAL', handler: 'YULITA' },
  { id: 145, email: 'gilangdion52@gmail.com', password: 'AAaa1234@', device: 'Q113', status: 'USING', assign: 'INTERNAL', handler: 'YULITA' },
  { id: 146, email: 'ldeclan582@gmail.com', password: 'AAaa1234@', device: 'F60', status: 'USING', assign: '', handler: '' },
  { id: 147, email: 'georgecrsn33@gmail.com', password: 'AAaa1234@', device: 'F60', status: 'USING', assign: '', handler: '' },
  { id: 148, email: 'greysonmilo563@gmail.com', password: 'AAaa1234@', device: 'F60', status: 'USING', assign: '', handler: '' },
  { id: 149, email: 'jacobalthea118@gmail.com', password: 'AAaa1234@', device: 'F104', status: 'USING', assign: '', handler: 'ERIC' },
  { id: 150, email: 'doubledinger1@gmail.com', password: 'AAaa1234@', device: 'F115', status: 'NEED VERIFY', assign: '', handler: '' },
  { id: 151, email: 'jiej20614@gmail.com', password: 'AAaa1234@', device: 'F83', status: 'NEED VERIFY', assign: '', handler: '' },
  { id: 152, email: 'skyb20340@gmail.com', password: 'AAaa1234@', device: 'F123', status: 'NEED VERIFY', assign: '', handler: '' },
  { id: 153, email: 'countryroad729@gmail.com', password: 'AAaa1234@', device: 'F123', status: 'NEED VERIFY', assign: '', handler: '' },
  { id: 154, email: 'bakwanbala0@gmail.com', password: 'AAaa1234@', device: 'F123', status: 'NEED VERIFY', assign: '', handler: '' },
  { id: 155, email: 'jehanjehian559@gmail.com', password: 'AAaa1234@', device: 'F123', status: 'NEED VERIFY', assign: '', handler: '' },
  { id: 156, email: 'kkim27265@gmail.com', password: 'AAaa1234@', device: 'F101', status: 'NEED VERIFY', assign: '', handler: '' },
  { id: 157, email: 'nanaadianaa7@gmail.com', password: 'AAaa1234@', device: 'F126', status: 'NEED VERIFY', assign: '', handler: '' },
  { id: 158, email: 'kuncorokun208@gmail.com', password: 'AAaa1234@', device: 'F110', status: 'NEED VERIFY', assign: '', handler: '' },
  { id: 159, email: 'yaoying596@gmail.com', password: 'AAaa1234@', device: 'F112', status: 'NEED VERIFY', assign: '', handler: '' },
  { id: 160, email: 'slion3301@gmail.com', password: 'AAaa1234@', device: 'F125', status: 'NEED VERIFY', assign: '', handler: '' },
  { id: 161, email: 'clalupian@gmail.com', password: 'AAaa1234', device: 'F106', status: 'NEED VERIFY', assign: '', handler: '' },
  { id: 162, email: 'boiyendiana@gmail.com', password: 'AAaa1234@', device: 'F106', status: 'NEED VERIFY', assign: '', handler: '' },
  { id: 163, email: 'biandabianca71@gmail.com', password: 'AAaa1234@', device: 'F110', status: 'NEW', assign: '', handler: '' },
  { id: 164, email: 'biancabubu298@gmail.com', password: 'AAaa1234@', device: 'F129', status: 'NEW', assign: '', handler: '' },
  { id: 165, email: 'brendabila6@gmail.com', password: 'AAaa1234@', device: 'F129', status: 'NEW', assign: '', handler: '' },
  { id: 166, email: 'biandaclara63@gmail.com', password: 'AAaa1234@', device: 'F129', status: 'NEW', assign: '', handler: '' },
  { id: 167, email: 'dndrshp@gmail.com', password: 'AAaa1234@', device: 'F129', status: 'NEW', assign: '', handler: '' },
  { id: 168, email: 'gianmano984@gmail.com', password: 'AAaa1234', device: 'F34', status: 'NEW', assign: '', handler: '' },
  { id: 169, email: 'titipratiwi696@gmail.com', password: 'AAaa1234@', device: 'F45', status: 'NEW', assign: '', handler: '' },
  { id: 170, email: 'yanisryni88@gmail.com', password: 'AAaa1234@', device: 'F45', status: 'NEW', assign: '', handler: '' },
  { id: 171, email: 'cmartabak53@gmail.com', password: 'AAaa1234@', device: 'F125', status: 'NEW', assign: '', handler: '' },
  { id: 172, email: 'ellomardian340@gmail.com', password: 'AAaa1234@', device: 'F105', status: 'NEW', assign: '', handler: '' },
  { id: 173, email: 'andikasrya88@gmail.com', password: 'AAaa1234@', device: 'F105', status: 'NEW', assign: '', handler: '' },
  { id: 174, email: 'hazeleye976@gmail.com', password: 'AAaa1234@', device: 'F07', status: 'NEW', assign: '', handler: '' },
  { id: 175, email: 'agakgimana39@gmail.com', password: 'AAaa1234@', device: 'F77', status: 'NEW', assign: '', handler: '' },
  { id: 176, email: 'clvnleon88@gmail.com', password: 'AAaa1234@', device: 'Q133', status: 'NEW', assign: '', handler: '' },
  { id: 177, email: 'marinapoetri84@gmail.com', password: 'AAaa1234@', device: 'F50', status: 'NEW', assign: '', handler: '' },
  { id: 178, email: 'dianaclr45@gmail.com', password: 'AAaa1234@', device: 'F50', status: 'NEW', assign: '', handler: '' },
  { id: 179, email: 'mahendradedi43@gmail.com', password: 'AAaa1234@', device: '26', status: 'NEW', assign: '', handler: '' },
  { id: 180, email: 'bularangipride@gmail.com', password: 'AAaa1234@', device: 'F115', status: 'NEW', assign: '', handler: '' },
  { id: 181, email: 'againtslove@gmail.com', password: 'AAaa1234@', device: 'F104', status: 'NEW', assign: '', handler: '' },
];

// Bank Account Details
export interface BankAccount {
  id: number;
  bankName: string;
  status: string;
  accountHolderName: string;
  bankAccountNumber: string;
  email: string;
  emailPassword: string;
  bankPassword: string;
  device: string;
}

export const sampleBankAccounts: BankAccount[] = [];

// Bank Issues
export interface BankIssue {
  id: number;
  bankName: string;
  accountHolder: string;
  accountNumber: string;
  issue: string;
  lastBalance: string;
  status: string;
  handler: string;
  dateReported: string;
  device?: string;
}

export const sampleBankIssues: BankIssue[] = [];

// C Operation
export interface COperation {
  id: number;
  bank: string;
  device: string;
  typeBank: string;
  agent: string;
  status: string;
}

export const sampleCOperations: COperation[] = [];

// Transaction Summary
export interface Transaction {
  id: number;
  date: string;
  bankName: string;
  line: string;
  inCount: number;
  outCount: number;
  inAmount: number;
  outAmount: number;
}

export const sampleTransactions: Transaction[] = [];

// Agent Listing
export interface Agent {
  id: number;
  agentName: string;
  agentId?: string;
  joinDate: string;
  totalCommission: number;
  totalBank: number;
  totalDownline: number;
  agentContact?: string;
}

export const sampleAgents: Agent[] = [];

// Downline
export interface Downline {
  id: number;
  agentId: number;
  nameDownline: string;
  joinDate: string;
  commission: number;
  bank: string;
  downlineContact: string;
  address: string;
}

export const sampleDownlines: Downline[] = [];

// Daily Report
export interface DailyReport {
  id: number;
  staffName: string;
  note: string;
  date: string;
}

export const sampleDailyReports: DailyReport[] = [];

// Wealth+
export interface WealthListing {
  id: number;
  ownerCode: string;
  bankName: string;
  accountHolderName: string;
  ownerContact: string;
  agentContact: string;
  rentAmount: number;
  commission: number;
  salesCommission: number;
  paymentMethod: string;
  paymentDate: string;
  client: string;
  sellingPrice: number;
  contractStart: string;
  contractEnd: string;
  contractMonth: number;
  accountStatus: string;
}

export const sampleWealthListings: WealthListing[] = [];

// Last In Out
export interface LastInOut {
  id: number;
  dateIssued: string;
  bankName: string;
  bankAccountHolderName: string;
  bankAccountNumber: string;
  bankBalance: string;
  issues: string;
  lastIn1Time: string;
  lastIn1Name: string;
  lastIn1Amount: string;
  lastIn2Time: string;
  lastIn2Name: string;
  lastIn2Amount: string;
  lastIn3Time: string;
  lastIn3Name: string;
  lastIn3Amount: string;
  lastOut1Time: string;
  lastOut1Name: string;
  lastOut1Amount: string;
  lastOut2Time: string;
  lastOut2Name: string;
  lastOut2Amount: string;
  lastOut3Time: string;
  lastOut3Name: string;
  lastOut3Amount: string;
}

export const sampleLastInOuts: LastInOut[] = [];

// Bank Issue Follow Up
export interface BankIssueFollowUp {
  id: number;
  date: string;
  time: string;
  bankName: string;
  bankAccountHolderName: string;
  bankAccountNumber: string;
  device: string;
  operator: string;
  transferOutBalance: string;
  attachment: string;
}

export const sampleBankIssueFollowUps: BankIssueFollowUp[] = [
  { id: 1, date: '02/08/2025', time: '13:27', bankName: 'LIQUIDPAY', bankAccountHolderName: 'Jim Lem', bankAccountNumber: '6584141979#XNAP', device: 'F20', operator: 'Yulita', transferOutBalance: '312.73', attachment: 'https://pasteboard.co/MrIN0Ul0ns65.png' },
  { id: 2, date: '05/08/2025', time: '2:54:00 AM', bankName: 'TRUST', bankAccountHolderName: 'Lin Zhan Hao', bankAccountNumber: '145290193', device: 'F69', operator: 'Danial', transferOutBalance: '188.09', attachment: 'https://pasteboard.co/j08KSDp2uTdY.png' },
  { id: 3, date: '05/08/2025', time: '4:49:00 AM', bankName: 'TRUST', bankAccountHolderName: 'Grace Tang Zhou Yan', bankAccountNumber: '111680419', device: 'F43', operator: 'Danial', transferOutBalance: '69.00', attachment: 'https://pasteboard.co/CBsUwnRPBKLQ.png' },
  { id: 4, date: '05/08/2025', time: '15:31:00 PM', bankName: 'GXS', bankAccountHolderName: 'Lee Ah Bee', bankAccountNumber: '8880008746', device: '122', operator: 'Yulita', transferOutBalance: '50.16', attachment: 'https://pasteboard.co/DJW25SoVC4ZV.png' },
  { id: 5, date: '07/08/2025', time: '13:48:00 PM', bankName: 'GXS', bankAccountHolderName: 'Aqilah Muslihah Binte hapit G', bankAccountNumber: '8888178368', device: 'F19', operator: 'Yulita', transferOutBalance: '907.51', attachment: 'https://pasteboard.co/pQ8fb4GIl3v2.png' },
  { id: 6, date: '07/08/2025', time: '14:00:00 PM', bankName: 'GXS', bankAccountHolderName: 'Herdawati Binte Abu G', bankAccountNumber: '8888537142', device: '5', operator: 'Yulita', transferOutBalance: '1909.96', attachment: 'https://pasteboard.co/jygRw3GwHhsK.png' },
  { id: 7, date: '07/08/2025', time: '14:03:00 PM', bankName: 'GXS', bankAccountHolderName: 'Muhammad Akil Bin Rosni G', bankAccountNumber: '8888610584', device: '16', operator: 'Yulita', transferOutBalance: '1200.89', attachment: 'https://pasteboard.co/9lV1uq0N4jSL.png' },
  { id: 8, date: '07/08/2025', time: '14:06:00 PM', bankName: 'GXS', bankAccountHolderName: 'Adriano Francisco Louis Nacu G', bankAccountNumber: '8880501062', device: 'F33', operator: 'Yulita', transferOutBalance: '1231.53', attachment: 'https://pasteboard.co/AiLhL7Ve6A9e.png' },
  { id: 9, date: '08/08/2025', time: '14:55:00 PM', bankName: 'GXS', bankAccountHolderName: 'Chua Yuan Xun Farall', bankAccountNumber: '8880226751', device: 'F61', operator: 'Yulita', transferOutBalance: '1023.96', attachment: 'https://pasteboard.co/ktbDVOiZ71f6.png' },
  { id: 10, date: '09/08/2025', time: '12:16:00 PM', bankName: 'LIQUIDPAY', bankAccountHolderName: 'Rifqi zulfiqar', bankAccountNumber: '+6588932753#XNAP', device: 'F90', operator: 'Yulita', transferOutBalance: '79.22', attachment: 'https://pasteboard.co/JaTFchUjgNGE.png' },
  { id: 11, date: '10/08/2025', time: '5:01:00 AM', bankName: 'TRUST', bankAccountHolderName: 'Shailesh Aravin S/O Kuma T', bankAccountNumber: '164721847', device: 'F46', operator: 'Danial', transferOutBalance: '971.00', attachment: 'https://pasteboard.co/yj2Ez4MeSGgK.png' },
  { id: 12, date: '10/08/2025', time: '5:39:00 AM', bankName: 'TRUST', bankAccountHolderName: 'MD Maahiruzzaman', bankAccountNumber: '151124211', device: 'F70', operator: 'Danial', transferOutBalance: '767.00', attachment: 'https://pasteboard.co/kjKdAnYmwBWu.png' },
  { id: 13, date: '10/08/2025', time: '6:05:00 AM', bankName: 'TRUST', bankAccountHolderName: 'Brandon Russell Gunawardena', bankAccountNumber: '114552599', device: 'F78', operator: 'Danial', transferOutBalance: '291.00', attachment: 'https://pasteboard.co/qNPcJt1w0B06.png' },
  { id: 14, date: '10/08/2025', time: '6:36:00 AM', bankName: 'TRUST', bankAccountHolderName: 'Mohamad Khidir Qhazindar Bin Mohamed Rizal', bankAccountNumber: '182866707', device: 'F82', operator: 'Danial', transferOutBalance: '397.00', attachment: 'https://pasteboard.co/gtPJtpxKVkeP.png' },
  { id: 15, date: '11/08/2025', time: '1:40:00 AM', bankName: 'TRUST', bankAccountHolderName: 'Nabila binte Abdul Rahman', bankAccountNumber: '179323886', device: 'F71', operator: 'Danial', transferOutBalance: '1464.00', attachment: 'https://pasteboard.co/LFJmVUca6xwB.png' },
  { id: 16, date: '11/08/2025', time: '6:25:00 AM', bankName: 'TRUST', bankAccountHolderName: 'Muhammad Khair Bin E Samsul', bankAccountNumber: '133359695', device: '14', operator: 'Danial', transferOutBalance: '1660.00', attachment: 'https://pasteboard.co/8fw5nrLgELKF.png' },
  { id: 17, date: '12/08/2025', time: '8:37:00 AM', bankName: 'TRUST', bankAccountHolderName: 'Noor Rifqi Zulfiqar Bin Suhaimy', bankAccountNumber: '119258002', device: 'F88', operator: 'Danial', transferOutBalance: '2157.00', attachment: 'https://pasteboard.co/o7oZJsgnKnyd.png' },
  { id: 18, date: '12/08/2025', time: '13:05:00 PM', bankName: 'TRUST', bankAccountHolderName: 'Arvinn Ashton Suraseh', bankAccountNumber: '125503573', device: 'F80', operator: 'Yulita', transferOutBalance: '12.00', attachment: 'https://pasteboard.co/2i3gcpy2y7Zs.png' },
  { id: 19, date: '12/08/2025', time: '13:20:00 PM', bankName: 'MARI', bankAccountHolderName: 'Niq Ilhan Bin Abdul Halim', bankAccountNumber: '117298483', device: 'F72', operator: 'Yulita', transferOutBalance: '184.50', attachment: 'https://pasteboard.co/UrZSE21kKGpm.png' },
  { id: 20, date: '13/08/2025', time: '12:57:00 AM', bankName: 'TRUST', bankAccountHolderName: 'Muhammad Naufal Bin Muhammad Rizal', bankAccountNumber: '123625378', device: 'F01', operator: 'Danial', transferOutBalance: '1161.00', attachment: 'https://pasteboard.co/ofaRCIwAtIFH.png' },
  { id: 21, date: '13/08/2025', time: '6:40:00 AM', bankName: 'TRUST', bankAccountHolderName: 'Ramesh Babu Sowmithran', bankAccountNumber: '1417010111', device: 'F90', operator: 'Danial', transferOutBalance: '1829.00', attachment: 'https://pasteboard.co/qwLG2nfYLN6G.png' },
  { id: 22, date: '13/08/2025', time: '6:58:00 AM', bankName: 'TRUST', bankAccountHolderName: 'Darshini Devi D/O Albert Ravendrajah Wijeratne', bankAccountNumber: '175712686', device: 'F91', operator: 'Danial', transferOutBalance: '649.00', attachment: 'https://pasteboard.co/nDAIg7H665zj.png' },
  { id: 23, date: '13/08/2025', time: '11:49:00 AM', bankName: 'GXS', bankAccountHolderName: 'Koh Yan Jie Jerry', bankAccountNumber: '8880120525', device: 'F94', operator: 'Yulita', transferOutBalance: '449.04', attachment: 'https://pasteboard.co/Af6KNu9sbC3e.png' },
  { id: 24, date: '13/08/2025', time: '12:11:00 AM', bankName: 'GXS', bankAccountHolderName: 'Nurfaizurah Binte Mohd Aris', bankAccountNumber: '8882895066', device: 'F91', operator: 'Yulita', transferOutBalance: '90.29', attachment: 'https://pasteboard.co/S7xXPLWKsTxH.png' },
  { id: 25, date: '13/08/2025', time: '12:18:00 AM', bankName: 'GXS', bankAccountHolderName: 'Abdul Razmin Bin Abdul Razak', bankAccountNumber: '8887492828', device: 'F86', operator: 'Yulita', transferOutBalance: '171.22', attachment: 'https://pasteboard.co/8rtdZ37uHjkn.png' },
  { id: 26, date: '13/08/2025', time: '12:25:00 AM', bankName: 'GXS', bankAccountHolderName: 'Natalia Balqisha Binte Muhamad Nadzri', bankAccountNumber: '8881076593', device: 'F85', operator: 'Yulita', transferOutBalance: '148.93', attachment: 'https://pasteboard.co/zQtv6HkiJvnk.png' },
  { id: 27, date: '13/08/2025', time: '14:05:00 AM', bankName: 'GXS', bankAccountHolderName: 'LinZhan Hao', bankAccountNumber: '96485452', device: 'F82', operator: 'Yulita', transferOutBalance: '3949.99', attachment: 'https://pasteboard.co/FwPKqwAoiKNc.png' },
  { id: 28, date: '14/08/2025', time: '2:09:00 AM', bankName: 'TRUST', bankAccountHolderName: 'Ming Wai Kuan', bankAccountNumber: '199944117', device: 'F11', operator: 'Danial', transferOutBalance: '717.00', attachment: 'https://pasteboard.co/58A02Yj6spf0.png' },
  { id: 29, date: '14/08/2025', time: '2:26:00 AM', bankName: 'GXS', bankAccountHolderName: 'Sheryn Natasya Binte Mohamad Aidil', bankAccountNumber: '8886906588', device: 'F12', operator: 'Danial', transferOutBalance: '2310.00', attachment: 'https://pasteboard.co/h2nh3bWnT673.png' },
  { id: 30, date: '14/08/2025', time: '4:54:00 AM', bankName: 'GXS', bankAccountHolderName: 'Daiyan Hasydan Edica Farthiar', bankAccountNumber: '8886599599', device: 'F07', operator: 'Danial', transferOutBalance: '1434.00', attachment: 'https://pasteboard.co/KxJkMSnLoALh.png' },
  { id: 31, date: '14/08/2025', time: '9:27:00 AM', bankName: 'GXS', bankAccountHolderName: 'Ng Chew Yi', bankAccountNumber: '8884004089', device: 'F40', operator: 'Yulita', transferOutBalance: '1101.81', attachment: 'https://pasteboard.co/4A5byOoKTCqV.png' },
  { id: 32, date: '14/08/2025', time: '11:58:00 AM', bankName: 'MARI', bankAccountHolderName: 'Ryan Rezki Bin Rashid M', bankAccountNumber: '195153091', device: 'F44', operator: 'Yulita', transferOutBalance: '571.63', attachment: 'https://pasteboard.co/zQiPIaHROCV9.png' },
  { id: 33, date: '14/08/2025', time: '21:01:00 AM', bankName: 'MARI', bankAccountHolderName: 'Gemmabelle Lim Jie Yi', bankAccountNumber: '170068097', device: 'F51', operator: 'Yulita', transferOutBalance: '181.16', attachment: 'https://pasteboard.co/zNx1AdgqSUw9.png' },
  { id: 34, date: '14/08/2025', time: '21:18 PM', bankName: 'GXS', bankAccountHolderName: 'Rakhshan Rayan bin Mohamed Mustafa', bankAccountNumber: '8884455000', device: 'Q126', operator: 'Danial', transferOutBalance: '3138.00', attachment: 'https://pasteboard.co/Q6hY0TfgKUVq.png' },
  { id: 35, date: '15/08/2025', time: '3:56:00 AM', bankName: 'TRUST', bankAccountHolderName: 'Syakilah Aliana Binte Shahril', bankAccountNumber: '142472000', device: 'F03', operator: 'Danial', transferOutBalance: '2770.00', attachment: 'https://pasteboard.co/1HBfRg3uX5x1.png' },
  { id: 36, date: '16/08/2025', time: '7:50:00 AM', bankName: 'GXS', bankAccountHolderName: 'Risky Hermanda Bin Sulaiman', bankAccountNumber: '8887033036', device: 'F87', operator: 'Danial', transferOutBalance: '128.45', attachment: 'https://pasteboard.co/wbjZQ82HJ0yO.png' },
  { id: 37, date: '18/08/2025', time: '1:34:00 AM', bankName: 'GXS', bankAccountHolderName: 'Koh Yan Jie Jerry', bankAccountNumber: '8880120525', device: 'F94', operator: 'Danial', transferOutBalance: '200.00', attachment: 'https://pasteboard.co/vl0rPnaPvdMm.png' },
  { id: 38, date: '22/08/2025', time: '11:33:00 AM', bankName: 'GXS', bankAccountHolderName: 'Leishaa Thamodaran', bankAccountNumber: '8883043963', device: 'F92', operator: 'Yulita', transferOutBalance: '249.98', attachment: 'https://pasteboard.co/QP7AYkYsqP6A.png' },
  { id: 39, date: '22/08/2025', time: '18:58 PM', bankName: 'GXS', bankAccountHolderName: 'Ishwar Harendran Krishnan', bankAccountNumber: '8880511756', device: 'Q139', operator: 'Danial', transferOutBalance: '1556.90', attachment: 'https://pasteboard.co/xwzHPLWLtgIX.png' },
  { id: 40, date: '24/08/2025', time: '20:01:00 PM', bankName: 'TRUST', bankAccountHolderName: 'Mohamad Asraf Bin Asman T', bankAccountNumber: '0111829057', device: 'F99', operator: 'Yulita', transferOutBalance: '631.00', attachment: 'https://pasteboard.co/2CynGmNhfGBC.png' },
  { id: 41, date: '25/08/2025', time: '17:56:00 PM', bankName: 'GXS', bankAccountHolderName: 'Branden Chng Rui Min', bankAccountNumber: '8880849313', device: 'Q083', operator: 'Danial', transferOutBalance: '2237.63', attachment: 'https://pasteboard.co/bNjw00TgdZFu.png' },
  { id: 42, date: '26/08/2025', time: '11:31:00 AM', bankName: 'OCBC', bankAccountHolderName: 'Ahpiq Koikoi', bankAccountNumber: '604540211001', device: '25', operator: 'Yulita', transferOutBalance: '222.08', attachment: 'https://pasteboard.co/8dZyzHlFfIV2.png' },
  { id: 43, date: '27/08/2025', time: '11:36:00 AM', bankName: 'GXS', bankAccountHolderName: 'Logini', bankAccountNumber: '8888526707', device: 'F95', operator: 'Yulita', transferOutBalance: '184.74', attachment: 'https://pasteboard.co/qSKKnpexOaw9.png' },
  { id: 44, date: '28/08/2025', time: '12:57:00 PM', bankName: 'MARI', bankAccountHolderName: 'Meget Muhammad Hairel Bin Muhammag', bankAccountNumber: '158061436', device: 'F54', operator: 'Yulita', transferOutBalance: '15.74', attachment: 'https://pasteboard.co/GxouHhRNBRBu.png' },
  { id: 45, date: '28/08/2025', time: '19:29:00 PM', bankName: 'GXS', bankAccountHolderName: 'Chua Yu Xiang', bankAccountNumber: '8884541312', device: 'F77', operator: 'Yulita', transferOutBalance: '69.32', attachment: 'https://pasteboard.co/fDxYRZ4AB4xx.png' },
  { id: 46, date: '29/08/2025', time: '17:31:00 PM', bankName: 'TRUST', bankAccountHolderName: 'Alif Iswandy Bin Ismail', bankAccountNumber: '0184345619', device: 'F76', operator: 'Yulita', transferOutBalance: '800.85', attachment: 'https://pasteboard.co/MpJW4BMy3ofz.png' },
  { id: 47, date: '30/08/2025', time: '18:16PM', bankName: 'GXS', bankAccountHolderName: 'Gu Zhenghao', bankAccountNumber: '8881993821', device: 'F93', operator: 'Yulita', transferOutBalance: '2044.41', attachment: 'https://pasteboard.co/Dpj6TDFrZPOo.png' },
  { id: 48, date: '02/09/2025', time: '23:57:00 PM', bankName: 'MARI', bankAccountHolderName: 'Branden Chng Rui Minn', bankAccountNumber: '189817322', device: 'F24', operator: 'Yulita', transferOutBalance: '34.35', attachment: 'https://pasteboard.co/LYfgx6ljwDow.png' },
  { id: 49, date: '02/09/2025', time: '23:56:00 PM', bankName: 'MARI', bankAccountHolderName: 'Bahvani D/o Sumangan', bankAccountNumber: '192338142', device: '8', operator: 'Yulita', transferOutBalance: '75.7', attachment: 'https://pasteboard.co/ePuvFZgzeaik.png' },
  { id: 50, date: '03/09/2025', time: '21:42 PM', bankName: 'GXS', bankAccountHolderName: 'Bala Kirtikesh Redhy', bankAccountNumber: '8889515089', device: 'F48', operator: 'Yulita', transferOutBalance: '2076.58', attachment: 'https://pasteboard.co/XMLLgDXDGHBD.png' },
  { id: 51, date: '04/09/2025', time: '14:04 PM', bankName: 'TRUST', bankAccountHolderName: 'Lai Hui Min', bankAccountNumber: '108305806', device: 'F29', operator: 'Danial', transferOutBalance: '1830.00', attachment: 'https://pasteboard.co/YlZESIdv5x1Z.png' },
  { id: 52, date: '05/09/2025', time: '17:22 PM', bankName: 'GXS', bankAccountHolderName: 'Ryan Rezki Bin Rashid', bankAccountNumber: '8884015739', device: 'F100', operator: 'Danial', transferOutBalance: '261.06', attachment: 'https://pasteboard.co/dT1lDZBhfXC7.png' },
  { id: 53, date: '06/09/2025', time: '22:52 PM', bankName: 'LIQUIDPAY', bankAccountHolderName: 'Haha Qqq', bankAccountNumber: '+6589225898#XNAP', device: 'Q135', operator: 'Yulita', transferOutBalance: '306.48', attachment: 'https://pasteboard.co/JxNbmPpCmZta.png' },
  { id: 54, date: '08/09/2025', time: '10:55:00 AM', bankName: 'DBS', bankAccountHolderName: 'Patel Mayankkumar Ratilal', bankAccountNumber: '2718475811', device: 'F85', operator: 'Danial', transferOutBalance: '1000.00', attachment: 'https://pasteboard.co/XXAGDaGpsJqt.png' },
  { id: 55, date: '07/09/2025', time: '7:24:00 AM', bankName: 'LIQUIDPAY', bankAccountHolderName: 'Jun Wei Hoo', bankAccountNumber: '+6588745872#XNAP', device: 'Q124', operator: 'Yulita', transferOutBalance: '220.62', attachment: 'https://pasteboard.co/pLEe5Sies9Dh.png' },
  { id: 56, date: '09/09/2025', time: '11:10:00 AM', bankName: 'DBS', bankAccountHolderName: 'Patel Mayankkumar Ratilal', bankAccountNumber: '2718475811', device: 'F85', operator: 'Danial', transferOutBalance: '1000.00', attachment: 'https://pasteboard.co/wTM41CCIqQ9j.jpg' },
  { id: 57, date: '10/09/2025', time: '16:04 PM', bankName: 'GXS', bankAccountHolderName: 'M Nishathini', bankAccountNumber: '8880737062', device: '1', operator: 'Danial', transferOutBalance: '77.94', attachment: 'https://pasteboard.co/zZ3jQWKQ8W6M.jpg' },
  { id: 58, date: '11/09/2025', time: '12:26:00 PM', bankName: 'LIQUIDPAY', bankAccountHolderName: 'Darwin Aza', bankAccountNumber: '+6588049326#XNAP', device: '7', operator: 'Danial', transferOutBalance: '500', attachment: 'https://pasteboard.co/yQCsoDRIn7mj.jpg' },
  { id: 59, date: '01/09/2025', time: '12:29:00 PM', bankName: 'LIQUIDPAY', bankAccountHolderName: 'Rania Eliya', bankAccountNumber: '+6589338098#XNAP', device: 'F39', operator: '-', transferOutBalance: '68.05', attachment: 'https://pasteboard.co/JQYNUxYBTqQX.png' },
  { id: 60, date: '15/09/2025', time: '11:23:00 AM', bankName: 'LIQUIDPAY', bankAccountHolderName: 'Tino Sin', bankAccountNumber: '+6590671654#XNAP', device: 'Q151', operator: 'Danial', transferOutBalance: '68.72', attachment: 'https://pasteboard.co/HeBvBrEUMuBH.jpg' },
  { id: 61, date: '15/09/2025', time: '13:22 PM', bankName: 'LIQUIDPAY', bankAccountHolderName: 'Kallang Aitport', bankAccountNumber: '+6589759093#XNAP', device: '20', operator: 'Danial', transferOutBalance: '220.77', attachment: 'https://pasteboard.co/SXVu83JmcFJi.jpg' },
  { id: 62, date: '16/09/2025', time: '9:46:00 AM', bankName: 'LIQUIDPAY', bankAccountHolderName: 'Jayden Lim', bankAccountNumber: '+6589323612#XNAP', device: '11', operator: 'Danial', transferOutBalance: '165.2', attachment: 'https://pasteboard.co/nW1pOH8zvX6x.jpg' },
  { id: 63, date: '16/09/2025', time: '11:06:00 AM', bankName: 'LIQUIDPAY', bankAccountHolderName: 'Dawn Yeo', bankAccountNumber: '+6587520528#XNAP', device: '19', operator: 'Danial', transferOutBalance: '770.03', attachment: 'https://pasteboard.co/FIUB6oLpWwXs.jpg' },
  { id: 64, date: '17/09/2025', time: '11:52:00 AM', bankName: 'LIQUIDPAY', bankAccountHolderName: 'Mo Kiri', bankAccountNumber: '+6590562611#XNAP', device: 'Q165', operator: 'Danial', transferOutBalance: '900', attachment: 'https://pasteboard.co/It9xmHDkyVEj.jpg' },
  { id: 65, date: '18/09/2025', time: '14:53 PM', bankName: 'MARI', bankAccountHolderName: 'Lam Hoong Fei', bankAccountNumber: '152120213', device: '12', operator: 'Danial', transferOutBalance: '49.16', attachment: 'https://pasteboard.co/bg2KQhaaFL5G.jpg' },
  { id: 66, date: '22/09/2025', time: '14:49 PM', bankName: 'GXS', bankAccountHolderName: 'Ho Ting Feng Max', bankAccountNumber: '8882153771', device: 'F101', operator: 'Danial', transferOutBalance: '809.24', attachment: 'https://pasteboard.co/gGqL8j8BeeqQ.jpg' },
  { id: 67, date: '25/09/2025', time: '20:23 PM', bankName: 'LIQUIDPAY', bankAccountHolderName: 'Daven Teo', bankAccountNumber: '+6589704918#XNAP', device: 'Q120', operator: 'Danial', transferOutBalance: '41.23', attachment: 'https://pasteboard.co/U8s6fQRkuIHD.jpg' },
  { id: 68, date: '26/09/2025', time: '9:26:00 AM', bankName: 'LIQUIDPAY', bankAccountHolderName: 'Jeremy Lai', bankAccountNumber: '+6596120013#XNAP', device: 'F013', operator: 'Danial', transferOutBalance: '314', attachment: 'https://pasteboard.co/5riqnQLyIyZh.jpg' },
  { id: 69, date: '30/09/2025', time: '9:56:00 AM', bankName: 'LIQUIDPAY', bankAccountHolderName: 'Te Khant Lin', bankAccountNumber: '+6594581716#XNAP', device: 'F28', operator: 'Danial', transferOutBalance: '320', attachment: 'https://pasteboard.co/jhPzuQvcRd38.jpg' },
  { id: 70, date: '01/10/2025', time: '13:23 PM', bankName: 'LIQUIDPAY', bankAccountHolderName: 'Julena D', bankAccountNumber: '+6584515836#XNAP', device: 'F105', operator: 'Danial', transferOutBalance: '467.42', attachment: 'https://pasteboard.co/Bz9Lb3o1cDaM.jpg' },
  { id: 71, date: '08/10/2025', time: '13:36 PM', bankName: 'TRUST', bankAccountHolderName: 'Edvin Ng Zhe Jun', bankAccountNumber: '185895760', device: 'F92', operator: 'Danial', transferOutBalance: '588', attachment: 'https://pasteboard.co/IctsivrKEveT.jpg' },
  { id: 72, date: '08/10/2025', time: '19:45 PM', bankName: 'TRUST', bankAccountHolderName: 'Malicdem Micah Dionisio', bankAccountNumber: '112197579', device: '1', operator: 'Danial', transferOutBalance: '1065.29', attachment: 'https://pasteboard.co/lU8cjWgCtHCx.jpg' },
  { id: 73, date: '09/10/2025', time: '12:10 PM', bankName: 'LIQUIDPAY', bankAccountHolderName: 'Dan Bah', bankAccountNumber: '+6581791217#XNAP', device: 'F42', operator: 'Yulita', transferOutBalance: '912.64', attachment: 'https://pasteboard.co/EiKBYzohUKTN.png' },
  { id: 74, date: '08/10/2025', time: '20:23 PM', bankName: 'TRUST', bankAccountHolderName: 'Julian Bin Jusani', bankAccountNumber: '151335064', device: '26', operator: 'Danial', transferOutBalance: '200', attachment: 'https://pasteboard.co/AM8yLdRfKkC6.jpg' },
  { id: 75, date: '09/10/2025', time: '17:56 PM', bankName: 'TRUST', bankAccountHolderName: 'Nurhuda Binte Daud', bankAccountNumber: '113960934', device: 'NE003', operator: 'Danial', transferOutBalance: '1210.33', attachment: 'https://pasteboard.co/9dnsf27jG8PW.png' },
  { id: 76, date: '10/10/2025', time: '12:46 PM', bankName: 'LIQUIDPAY', bankAccountHolderName: 'Farel Ron', bankAccountNumber: '+6581619390#XNAP', device: 'F94', operator: 'Yulita', transferOutBalance: '889.85', attachment: 'https://pasteboard.co/mvNu19frGVRO.png' },
  { id: 77, date: '10/10/2025', time: '18:56 PM', bankName: 'GXS', bankAccountHolderName: 'Thariq Rahmani bin Mohd Roslan G', bankAccountNumber: '8880963841', device: 'F39', operator: 'Danial', transferOutBalance: '752', attachment: 'https://pasteboard.co/BCebtpCphXGr.jpg' },
  { id: 78, date: '12/10/2025', time: '19:20 PM', bankName: 'LIQUIDPAY', bankAccountHolderName: 'Rishab Upadhyay', bankAccountNumber: '+6592770353#XNAP', device: 'F78', operator: 'Danial', transferOutBalance: '472.49', attachment: 'https://pasteboard.co/nVwwPDlJcpxQ.jpg' },
  { id: 79, date: '14/10/2025', time: '12:13:00 PM', bankName: 'LIQUIDPAY', bankAccountHolderName: 'Lional Mega', bankAccountNumber: '+6580792523#XNAP', device: 'F29', operator: 'Danial', transferOutBalance: '176', attachment: 'https://pasteboard.co/gFKovCTscjry.jpg' },
  { id: 80, date: '14/10/2025', time: '14:31 PM', bankName: 'LIQUIDPAY', bankAccountHolderName: 'Trishan Jay', bankAccountNumber: '+6593822778#XNAP', device: 'F01', operator: 'Danial', transferOutBalance: '325.36', attachment: 'https://pasteboard.co/5UShP6Gsm9FX.jpg' },
  { id: 81, date: '14/10/2025', time: '15:31 PM', bankName: 'LIQUIDPAY', bankAccountHolderName: 'Rayn Lee', bankAccountNumber: '+6587562968#XNAP', device: '26', operator: 'Danial', transferOutBalance: '109.31', attachment: 'https://pasteboard.co/9ADv451gpAgg.jpg' },
  { id: 82, date: '15/10/2025', time: '17:47 PM', bankName: 'LIQUIDPAY', bankAccountHolderName: 'Fatah Qoyyum', bankAccountNumber: '+6594876564#XNAP', device: 'F04', operator: 'Danial', transferOutBalance: '242.75', attachment: 'https://pasteboard.co/wct7WQtTjsYc.jpg' },
  { id: 83, date: '17/10/2025', time: '21:39 PM', bankName: 'LIQUIDPAY', bankAccountHolderName: 'Lutf Hazique', bankAccountNumber: '+6592285842#XNAP', device: 'F014', operator: 'Danial', transferOutBalance: '57.09', attachment: 'https://pasteboard.co/yFWFU3cAzF3C.jpg' },
  { id: 84, date: '21/10/2025', time: '11:33:00 AM', bankName: 'LIQUIDPAY', bankAccountHolderName: 'Hazirah Umar', bankAccountNumber: '+6580709078#XNAP', device: 'Q90', operator: 'Danial', transferOutBalance: '206.09', attachment: 'https://pasteboard.co/qzrVbDP9G5Vq.jpg' },
  { id: 85, date: '22/10/2025', time: '14:59 PM', bankName: 'LIQUIDPAY', bankAccountHolderName: 'Nur Aqidah', bankAccountNumber: '+6580776274#XNAP', device: 'F112', operator: 'Danial', transferOutBalance: '344.89', attachment: 'https://pasteboard.co/15rCAirY10oG.jpg' },
  { id: 86, date: '22/10/2025', time: '21:51 PM', bankName: 'LIQUIDPAY', bankAccountHolderName: 'Haziq Rifqi', bankAccountNumber: '+6590047717#XNAP', device: 'F79', operator: 'Yulita', transferOutBalance: '657.87', attachment: 'https://pasteboard.co/fezb3ryxPUGp.png' },
  { id: 87, date: '23/10/2025', time: '10:36:00 AM', bankName: 'LIQUIDPAY', bankAccountHolderName: 'Milyy Melon', bankAccountNumber: '+6589262529#XNAP', device: 'F100', operator: 'Danial', transferOutBalance: '200.14', attachment: 'https://pasteboard.co/4Kf8W2OzRUHy.jpg' },
  { id: 88, date: '23/10/2025', time: '14:50 PM', bankName: 'LIQUIDPAY', bankAccountHolderName: 'Yusuf Ismail', bankAccountNumber: '+6583327939#XNAP', device: 'F49', operator: 'Danial', transferOutBalance: '436.45', attachment: 'https://pasteboard.co/sMlmuksFocDN.jpg' },
  { id: 89, date: '23/10/2025', time: '15:21 PM', bankName: 'LIQUIDPAY', bankAccountHolderName: 'Kong King', bankAccountNumber: '+6584247621#XNAP', device: 'F11', operator: 'Danial', transferOutBalance: '200', attachment: 'https://pasteboard.co/t98xUnFyoXKJ.jpg' },
  { id: 90, date: '24/10/2025', time: '20:55 PM', bankName: 'LIQUIDPAY', bankAccountHolderName: 'Josiah Peh', bankAccountNumber: '+6588987151#XNAP', device: 'F116', operator: 'Danial', transferOutBalance: '765.36', attachment: 'https://pasteboard.co/KLaGn8xECvlS.jpg' },
  { id: 91, date: '27/10/2025', time: '9:56:00 AM', bankName: 'LIQUIDPAY', bankAccountHolderName: 'Md Ridzuan', bankAccountNumber: '+6583998929#XNAP', device: 'F45', operator: 'Danial', transferOutBalance: '270.4', attachment: 'https://pasteboard.co/waBFxxe77Ymm.jpg' },
  { id: 92, date: '27/10/2025', time: '16:10 PM', bankName: 'LIQUIDPAY', bankAccountHolderName: 'Muhammad Shazafwan', bankAccountNumber: '+6588470916#XNAP', device: 'Q137', operator: 'Danial', transferOutBalance: '113.13', attachment: 'https://pasteboard.co/YSyLJOpwIutR.jpg' },
  { id: 93, date: '27/10/2025', time: '16:10 PM', bankName: 'LIQUIDPAY', bankAccountHolderName: 'Haziq Danial', bankAccountNumber: '+6587621373#XNAP', device: 'F81', operator: 'Danial', transferOutBalance: '334.31', attachment: 'https://pasteboard.co/v1nJUsFRWoFw.jpg' },
  { id: 94, date: '02/11/2025', time: '23:11 PM', bankName: 'LIQUIDPAY', bankAccountHolderName: 'Rafiq Khan', bankAccountNumber: '+6589591047#XNAP', device: 'F127', operator: 'Danial', transferOutBalance: '954.65', attachment: 'https://pasteboard.co/izOWc09HXYGx.jpg' },
  { id: 95, date: '05/11/2025', time: '11.53 PM', bankName: 'LIQUIDPAY', bankAccountHolderName: 'Quraisyah Juffrey', bankAccountNumber: '+6597465679#XNAP', device: 'F07', operator: 'Yulita', transferOutBalance: '1412.14', attachment: 'https://pasteboard.co/HBxexl8sB5Ed.png' },
  { id: 96, date: '11/11/2025', time: '17:16 PM', bankName: 'LIQUIDPAY', bankAccountHolderName: 'Ryden Quraish', bankAccountNumber: '+6587851476#XNAP', device: 'F66', operator: 'Danial', transferOutBalance: '595.83', attachment: 'https://pasteboard.co/YpV6Lb5DJwVO.jpg' },
  { id: 97, date: '12/11/2025', time: '10:50:00 PM', bankName: 'TRUST', bankAccountHolderName: 'Caius kaizhe teo', bankAccountNumber: '175565704', device: '6', operator: 'Danial', transferOutBalance: '1513.84', attachment: 'https://pasteboard.co/i9Ow9hB33KwP.jpg' },
  { id: 98, date: '13/11/2025', time: '2:21:00 AM', bankName: 'LIQUIDPAY', bankAccountHolderName: 'Xx X', bankAccountNumber: '+6585033445#XNAP', device: 'F114', operator: 'Yulita', transferOutBalance: '622.64', attachment: 'https://pasteboard.co/ofb7yf4tZVMy.png' },
  { id: 99, date: '15/11/2025', time: '13:55 PM', bankName: 'MARI BANK', bankAccountHolderName: 'Aqid Dannyel Bin Abdullah', bankAccountNumber: '137040479', device: 'F115', operator: 'Yulita', transferOutBalance: '1749.69', attachment: 'https://pasteboard.co/d7ocX1YLLcfH.png' },
  { id: 100, date: '19/11/2025', time: '11:33:00 AM', bankName: 'LIQUIDPAY', bankAccountHolderName: 'Niqniq', bankAccountNumber: '+6588052433#XNAP', device: 'F129', operator: 'Yulita', transferOutBalance: '524.51', attachment: 'https://pasteboard.co/iovac9jKEstB.png' },
  { id: 101, date: '19/11/2025', time: '13:39:00 PM', bankName: 'LIQUIDPAY', bankAccountHolderName: 'Noor Hakim', bankAccountNumber: '+6587842274#XNAP', device: 'F131', operator: 'Yulita', transferOutBalance: '900', attachment: 'https://pasteboard.co/WCweyfAqGoNA.png' },
  { id: 102, date: '20/11/2025', time: '9:26:00 AM', bankName: 'LIQUIDPAY', bankAccountHolderName: 'Noor Hakim', bankAccountNumber: '+6587842274#XNAP', device: 'F131', operator: 'Yulita', transferOutBalance: '188.67', attachment: 'https://pasteboard.co/JTvo5fnDCj3N.png' },
];