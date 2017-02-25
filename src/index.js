import 'normalize.css'
import './js/modernizr.js'
import './js/contentFromJS.js'


if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) 
{
	import ('./css/main-mobile.scss');
 	import('./js/motion-mobile.js')
}else{
	import( './css/main.scss');
 	import('./js/motion.js');
}
/*if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 
 ){
 	import ('./css/main-mobile.scss');
 	import('./js/motion-mobile.js')
  }
 else {

 	import( './css/main.scss');
 	import('./js/motion.js');

  }*/