-- MySQL dump 10.13  Distrib 8.0.36, for macos14 (arm64)
--
-- Host: i11a106.p.ssafy.io    Database: ditto
-- ------------------------------------------------------
-- Server version	8.0.39-0ubuntu0.20.04.1

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
-- Table structure for table `user_tag`
--

DROP TABLE IF EXISTS `user_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_tag` (
  `tag_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `user_tag_id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`user_tag_id`),
  KEY `FK9qknt3y115f17660k0qnm9x3g` (`tag_id`),
  KEY `FKhqbypqh9kyjp3jcslfg67c6n5` (`user_id`),
  CONSTRAINT `FK9qknt3y115f17660k0qnm9x3g` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`tag_id`),
  CONSTRAINT `FKhqbypqh9kyjp3jcslfg67c6n5` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=235 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_tag`
--

LOCK TABLES `user_tag` WRITE;
/*!40000 ALTER TABLE `user_tag` DISABLE KEYS */;
INSERT INTO `user_tag` VALUES (6,4,1),(6,13,2),(1,13,3),(13,1,7),(14,1,8),(18,41,9),(17,41,10),(16,41,11),(17,42,12),(16,42,13),(15,42,14),(14,43,18),(13,43,19),(11,44,20),(8,45,33),(8,46,34),(6,47,35),(3,49,37),(4,50,40),(2,50,41),(1,51,42),(2,51,43),(2,52,44),(2,53,45),(1,54,46),(2,54,47),(5,54,48),(2,34,49),(5,34,50),(2,35,51),(6,35,52),(2,31,55),(6,31,56),(14,31,57),(13,32,58),(14,32,59),(9,32,60),(3,33,64),(4,33,65),(5,33,66),(6,83,67),(4,83,68),(3,83,69),(17,10,72),(15,10,73),(7,40,75),(8,40,76),(9,40,77),(9,61,84),(10,61,85),(11,61,86),(5,63,88),(4,63,89),(17,63,90),(17,64,94),(15,64,95),(12,64,96),(12,65,97),(14,78,105),(7,78,106),(8,71,107),(9,71,108),(10,71,109),(1,74,128),(2,74,129),(4,74,130),(2,75,131),(3,75,132),(4,75,133),(4,79,137),(3,79,138),(11,79,139),(3,76,140),(4,76,141),(6,76,142),(16,77,143),(18,77,144),(17,77,145),(6,82,146),(9,81,147),(7,81,148),(10,81,149),(2,37,150),(3,37,151),(15,37,152),(2,90,154),(14,90,155),(18,90,156),(2,86,157),(16,86,158),(17,86,159),(14,84,160),(7,62,161),(9,62,162),(11,62,163),(1,14,164),(4,16,165),(5,16,166),(18,17,167),(15,17,168),(4,18,172),(13,18,173),(18,18,174),(3,19,175),(1,19,176),(2,19,177),(10,21,178),(11,21,179),(2,87,180),(7,87,181),(14,87,182),(18,7,183),(8,7,184),(3,8,185),(18,25,186),(2,5,190),(5,5,191),(1,5,192),(8,6,193),(12,6,194),(7,6,195),(5,9,196),(1,9,197),(2,12,198),(4,12,199),(18,15,200),(15,15,201),(1,20,202),(3,20,203),(4,20,204),(4,56,207),(9,56,208),(17,56,209),(9,73,210),(15,73,211),(17,73,212),(1,26,213),(2,26,214),(3,26,215),(16,11,216),(15,11,217),(2,29,218),(14,29,219),(10,29,220),(10,22,221),(7,22,222),(15,22,223),(6,48,224),(1,48,225),(18,39,227),(12,39,228),(1,101,229),(10,101,230),(16,101,231),(8,103,232),(13,103,233),(14,103,234);
/*!40000 ALTER TABLE `user_tag` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-16  0:28:11
