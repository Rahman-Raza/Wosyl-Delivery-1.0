Application Name Overview
==============================================

Wosyl Delivery is a business to customer delivery platform that allows businesses such as restuarnats to deliver their customers orders.  The app uses third-party API's to handle the entire delivery from the point the business places the order on the app to when the customer confirms their order has been delivered.  


Required Environment / Minimum Setup
----------------------------------------------
In order to have a working environment to develop and test Wosyl, the following is required.

"node" : "^6.6.0"
"react": "^15.1.0"
"react-native": "^0.34.1"
"Xcode (For iOS)" : "7.3.1"

For device testing, any iOS version above 8.0 will work.  




Configuration
----------------------------------------------

Once all necessary dependencies are installed:

1. npm install -g react-native-cli

2. Change to directory of Wosyl Project

3. npm install

4. "Manually configure Mapbox GL with Xcode environment using this gude: "

	<a href="https://github.com/mapbox/react-native-mapbox-gl/blob/master/ios/install.md">Configuration Guide</a>


5. "To launch application:" react-native run-ios (for iOS)
	
	5.1 react-native run-android (for Android)
 



Testing
----------------------------------------------

How do you run the tests?




Production Environment
----------------------------------------------
All react native specific javascript code is written in the 
directory WosylDelivery/js

Each page/view controller of the app has its own directory under WosylDelivery/js/components.

Multiple third party compoenents where used 




Known Issues / Gotcha
----------------------------------------------
There are sometimes dependencies issues with the componenet API's used such
as Google Directions, Google Places Autocomplete and Mapbox GL.

Please check the componenets github readme documentation for manual configuration 
for both iOS and Android environments if you run into any issues.

