-- MySQL dump 10.13  Distrib 8.0.24, for macos11 (x86_64)
--
-- Host: 127.0.0.1    Database: api_todos
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(100) NOT NULL,
  `email` varchar(360) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'$2b$10$yXd0/rFJ8jLeJZ6zSbMaquv6DYVJoakOuRPlkj4LkS3x/Mqs6HZHq','alexandra.a.franklin@gmail.com','2023-10-04 15:01:57','2023-10-04 15:01:57'),(2,'$2b$10$1cEx2bEBy6tatV9ZoujRuemAshL6n9eH6RN.fvRUNJYxZsk/aOoTC','alexandra.a.franklin2@gmail.com','2023-10-04 15:02:04','2023-10-04 15:02:04'),(3,'$2b$10$lltekJeissa74aTSAa/TNu/iYFGjoCd9OQ9B1zUFK6cxLdOVFzHpy','alexandra.a.franklin3@gmail.com','2023-10-04 15:02:09','2023-10-04 15:02:09'),(4,'$2b$10$bDwat7.EEmN.uAyFCPkQw.ftKEkXQj54R3R0xflLGcagauPndKjW.','alexandra.a.franklin4@gmail.com','2023-10-04 15:20:22','2023-10-04 15:20:22'),(5,'$2b$10$qlsWM9wDsYaRQT4R/RxbJOmK43qcFpkfWc2rUvG.XRlRgzAoaoaMe','alexandra.a.franklin7@gmail.com','2023-10-04 16:03:56','2023-10-04 16:03:56'),(6,'$2b$10$tfEBLoy3TuhW4F6QHPXNWO4/Ty86HQmu9pKTQ11C2XKiOt1p4P.wa','bobisgreat@gmail.com','2023-10-04 16:08:19','2023-10-04 16:08:19'),(7,'$2b$10$usrdrPSTaYTGLCAUJhVlfu9gphQbWWymuazL8p04m1J5shp3kXwfa','bobisgreat2@gmail.com','2023-10-04 16:08:47','2023-10-04 16:08:47'),(8,'$2b$10$0Y5E8qHlklfI2j3TbD5KXe59OmUgonEMsIB4bqAa8fHmFpSsJn6rK','alexandra.a.franklin9@gmail.com','2023-10-04 16:10:20','2023-10-04 16:10:20'),(9,'$2b$10$DgQmdiiZ4PTaccC2sSbDd.oFWCBgsWr9BIGBchSOFtEsxicCvVd/G','sharonfranklin@gmail.com','2023-10-04 16:12:01','2023-10-04 16:12:01'),(10,'$2b$10$Ukw4Y0OEDKL84te9EBqo6OG0f2EVtbWcRzG4q4kPevxOB9k1QXg2G','zacclarke@gmail.com','2023-10-04 16:13:58','2023-10-04 16:13:58'),(11,'$2b$10$RlorVMkbIxRz0I.rZYpGLu3fC2zXT6tLTE8BWwvrY7O.my1hK61Ya','alexandra.a.franklin100@gmail.com','2023-10-04 16:17:57','2023-10-04 16:17:57');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-04 14:01:58
