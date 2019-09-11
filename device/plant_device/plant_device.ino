/*
 Name:		device_code.ino
 Created:	8/30/2019 6:26:25 PM
 Author:	Ryan Crawford
*/


#include <WiFiUdp.h>
#include <WiFiType.h>
#include <WiFiSTA.h>
#include <WiFiServer.h>
#include <WiFiScan.h>
#include <WiFiMulti.h>
#include <WiFiGeneric.h>
#include <WiFiClient.h>
#include <WiFiAP.h>
#include <WiFi.h>
#include <ETH.h>
#include <WebServer.h>
#include <EspMQTTClient.h>
#include <DHTesp.h>
#include <dummy.h>
#include "DHT.h"



#define DHTTYPE DHT11

uint64_t chipid = ESP.getEfuseMac();	//The chip ID is essentially its MAC address(length: 6 bytes).

//*********SSID and Pass for AP**************/
const char* ssidAP = "PlantDevice_" + chipid;
const char* passAP = "password";

//********* Static IP Config **************/
IPAddress ap_local_IP(192, 168, 1, 77);
IPAddress ap_gateway(192, 168, 1, 254);
IPAddress ap_subnet(255, 255, 255, 0);




// DHT Sensor
const int DHTPin = 22;

DHT dht(DHTPin, DHTTYPE);

static char celsiusTemp[7];
static char fahrenheitTemp[7];
static char humidityTemp[7];


void setup()
{
	Serial.begin(115200);
	WiFi.mode(WIFI_AP);
	Serial.println(WiFi.softAP(ssidAP, passAP) ? "soft-AP setup" : "Failed to connect");
	delay(100);
	Serial.println(WiFi.softAPConfig(ap_local_IP, ap_gateway, ap_subnet) ? "Configuring Soft AP" : "Error in Configuration");
	Serial.println(WiFi.softAPIP());

	server.begin();
}

void loop()
{


}
