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
-- Table structure for table `Todos`
--

DROP TABLE IF EXISTS `Todos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Todos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `UserId` int DEFAULT NULL,
  `task` varchar(100) NOT NULL,
  `dueDate` datetime NOT NULL,
  `isDone` int NOT NULL DEFAULT '0',
  `isVisible` int NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `todos_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Todos`
--

LOCK TABLES `Todos` WRITE;
/*!40000 ALTER TABLE `Todos` DISABLE KEYS */;
INSERT INTO `Todos` VALUES (1,1,'finish project proposal','2023-10-05 00:00:00',0,0,'2023-10-04 15:02:40','2023-10-04 15:03:56'),(2,1,'finish project proposal','2023-10-05 00:00:00',1,1,'2023-10-04 15:06:27','2023-10-04 17:59:29'),(3,1,'finish project proposal','2023-10-05 00:00:00',0,0,'2023-10-04 15:06:30','2023-10-04 15:14:35'),(4,1,'finish project proposal','2023-10-05 00:00:00',0,1,'2023-10-04 15:06:31','2023-10-04 15:06:31'),(5,1,'finish project proposal','2023-10-05 00:00:00',1,1,'2023-10-04 15:06:35','2023-10-04 17:44:03'),(6,2,'laundry','2023-10-05 00:00:00',1,1,'2023-10-04 15:15:21','2023-10-04 15:16:04'),(7,1,'sdfsdfsf','2023-10-28 00:00:00',0,0,'2023-10-04 17:34:20','2023-10-04 17:48:31'),(8,1,'sdfsdfsf','2023-10-28 00:00:00',0,0,'2023-10-04 17:34:46','2023-10-04 17:48:20'),(9,1,'Laundyr','2023-11-02 00:00:00',0,0,'2023-10-04 17:48:56','2023-10-04 17:49:09'),(10,1,'sdfsdfsf','2023-10-27 00:00:00',0,1,'2023-10-04 17:51:54','2023-10-04 17:51:54'),(11,1,'hello','2023-10-30 00:00:00',1,1,'2023-10-04 17:53:44','2023-10-04 17:53:48'),(12,1,'hello','2023-10-14 00:00:00',0,1,'2023-10-04 17:57:48','2023-10-04 17:57:48'),(13,1,'Finish this midterm ','2023-10-31 00:00:00',0,1,'2023-10-04 17:59:19','2023-10-04 17:59:19');
/*!40000 ALTER TABLE `Todos` ENABLE KEYS */;
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