-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: wholesale
-- ------------------------------------------------------
-- Server version	5.7.16-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `application`
--

LOCK TABLES `application` WRITE;
/*!40000 ALTER TABLE `application` DISABLE KEYS */;
/*!40000 ALTER TABLE `application` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `auction`
--

LOCK TABLES `auction` WRITE;
/*!40000 ALTER TABLE `auction` DISABLE KEYS */;
INSERT INTO `auction` VALUES (11,1002,'2017-01-02',NULL,'Banany spożywane są na surowo, jak również w innych formach - suszone, pieczone i marynowane. Są znakomitym dodatkiem do ciast, lodów, naleśników i innych deserów na zimno i ciepło. Doskonale łączą się z produktami mlecznymi, takimi jak mleko, jogurt i maślanka. Można z nich robić również galaretki, dżemy, budynie oraz powidła.','2017-01-20','A','Banany poszukiwane',NULL,8,1,NULL),(12,666,'2017-01-02',NULL,'Pomidor zwyczajny jest warzywną rośliną jednoroczną roślina z rodziny psiankowatych Solanaceae. Pochodzi z Ameryki Południowej lub Środkowej.\nRoślina jest gruczołowato lepko owłosiona, ma charakterystyczny zapach.','2017-01-20','A','Pomidor $$$ WANTED $$$',NULL,4,1,NULL),(13,9999,'2017-01-02',NULL,'Ananas należy do roślin z rodziny bromeliowatych. Ma długie, sztywne i kujące liście spiralnie ułożone na łodydze. Kwiaty ananasa mają fioletowy kolor.','2017-01-28','A','Kupimy każdego ananasa w tym mieście!',NULL,6,1,NULL),(14,500,'2017-01-02',NULL,' gatunek rośliny z rodziny selerowatych. Występuje w stanie dzikim pospolicie na terenach Europy, Azji i północnej Afryki. Jest również rośliną uprawną. W Polsce w stanie dzikim jest rośliną bardzo pospolitą.','2017-01-13','A','Więcej marchewek!',NULL,7,1,NULL),(15,10000,'2017-01-02',NULL,'Ogórek, ogórek, ogórek, zielony ma garniturek, if u know what I mean...','2017-01-29','A','Ogórek ogórek ogórek',NULL,5,1,NULL),(17,10000,'2017-01-02',NULL,'Gatunek rośliny należący do rodziny psiankowatych. Nazwa „ziemniak” odnosi się tak do całej rośliny, jak i do jej jadalnych, bogatych w skrobię bulw pędowych, z powodu których ten gatunek uprawia się na skalę masową.','2017-01-21','A','Ziomioki!',NULL,16,1,NULL);
/*!40000 ALTER TABLE `auction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `hibernate_sequence`
--

LOCK TABLES `hibernate_sequence` WRITE;
/*!40000 ALTER TABLE `hibernate_sequence` DISABLE KEYS */;
INSERT INTO `hibernate_sequence` VALUES (21),(21),(21),(21);
/*!40000 ALTER TABLE `hibernate_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES (4,'Polska','/public/uploads/uploaded_images/pomidor_wielkoowocowy2.jpg','Pomidor','Zwyczajny'),(5,'Polska','/public/uploads/uploaded_images/ogorek_zielony.jpg','Ogórek','Zielony'),(6,'Brazylia','/public/uploads/uploaded_images/Ananas.jpg','Ananas','Jadalny'),(7,'Polska','/public/uploads/uploaded_images/marchewka-ciekawostki.jpeg','Marchewka','Pomarańczowa'),(8,'Afryka','/public/uploads/uploaded_images/87561511626_ygoqtemwcswbjulkrtlg.jpg','Banan','Zagięty'),(16,'Polska','/public/uploads/uploaded_images/Ziemniaki.jpg','Ziemniak','Denar');
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (18,'ul. Miodowa 4/7 Kraków','adam.czeladnik@hurtowniawio.pl','Adam','Czeladnik','hurtownik','hurtownik','A','hurtownik'),(19,'Stara Wieś 20','michal.bakiewicz@hurtowniawio.pl','Michał','Bąkiewicz','rolnik','rolnik','A','rolnik'),(20,'ul. Hutnicza 66/6','dostawca.maciej@hurtowniawio.pl','Dostawca','Maciej','dostawca','dostawca','A','dostawca');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-01-02 19:51:35
