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
-- Table structure for table `step`
--

DROP TABLE IF EXISTS `step`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `step` (
  `class_id` int DEFAULT NULL,
  `file_id` int DEFAULT NULL,
  `step_id` int NOT NULL AUTO_INCREMENT,
  `step_no` tinyint DEFAULT NULL,
  `step_detail` varchar(255) DEFAULT NULL,
  `step_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`step_id`),
  KEY `FKqnv3aqlri2f8nhdsyxn28vp7i` (`class_id`),
  KEY `FKrwop6qjcdohyu278sp85t4iqj` (`file_id`),
  CONSTRAINT `FKqnv3aqlri2f8nhdsyxn28vp7i` FOREIGN KEY (`class_id`) REFERENCES `dclass` (`class_id`),
  CONSTRAINT `FKrwop6qjcdohyu278sp85t4iqj` FOREIGN KEY (`file_id`) REFERENCES `file` (`file_id`)
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `step`
--

LOCK TABLES `step` WRITE;
/*!40000 ALTER TABLE `step` DISABLE KEYS */;
INSERT INTO `step` VALUES (4,12,3,1,'쌀쌀','쌀'),(5,15,4,1,'뜨개질','뜨개질 준비물 준비'),(5,16,5,2,'뜨개질함','뜨개질'),(5,17,6,3,'마무리','재밌게 마무리'),(6,20,7,1,'재단한 날대들로 바닥짜기 기법을 배웁니다.','라탄 기법 배우기'),(6,21,8,2,'매끼돌리기를 합니다.','매끼돌리기'),(6,22,9,3,'덧날대를 끼워줍니다.','덧날대 끼우기'),(6,23,10,4,'마무르기를 해줍니다.','마무르기'),(8,31,11,1,'재단한 날대를 엮어주기위한 작업을 합니다.','날대 엮기'),(8,32,12,2,'막엮기로 높이를 올려줍니다.','막엮기'),(8,33,13,3,'젖혀마무르기 기법으로 작품을마무리합니다.','마무르기'),(9,36,14,1,'재료준비 및 재단한 환심을 합판에 연결해 엮기좋은 상태로 준비합니다.','합판 연결'),(9,37,15,2,'환심으로 엮어올리기를 해줍니다.','엮어 올리기'),(9,38,16,3,'무늬와, 마무르기 기법을 배웁니다','마무르기'),(10,41,17,1,'설기떡 위에 올릴 장미 조색과 장미꽃 파이핑 기법을 배워봅니다.','조색 및 파이핑'),(10,42,18,2,'어레인지 기법에 대해 배워봅니다.','어레인지'),(10,43,19,3,'장미꽃을 설기위에 올리는 작업을 합니다.','장미꽃 올리기'),(11,49,20,1,'우레탄줄 2개에 각각 누름볼 하나씩을 끼우고\n\n납작하게 눌러줍니다','누름볼로 누르기'),(11,50,21,2,'비즈를 줄에 끼워놓은 모습입니다\n\n아직 마감 전이기 때문에\n\n얼마든지 디자인 변경이 가능한 단계입니다','줄에 끼우기'),(11,51,22,3,'원하는대로 비즈를 끼웠다면\n\n꽃비즈 or 올챙이캡으로 우레탄줄 2개를\n\n한꺼번에 통과시켜 줍니다','캡 마감 단계'),(11,52,23,4,'올챙이캡 밖으로 튀어나온 줄을 잘라주고\n\n집게를 이용해 닫아줍니다','마무리 단계'),(12,75,24,1,'먼저, 여러분의 작업 공간에 필요한 재료들을 준비해 주세요. 키트에 포함된 준비물 외에 따로 필요한 준비물은 없으니까 걱정하지 않으셔도 돼요. \n\n작업 공간에 향수 베이스, 프래그런스 오일, 향수 공병, 시향지, 스티커를 준비해주세요.','재료준비'),(12,76,25,2,'향수를 만들기 전에 어떤 향을 조합할지 계획해볼게요. 조향 플래너를 사용해 톱 노트, 미들 노트, 베이스 노트를 결정하고 각각의 비율을 정하시면 됩니다.\n\n톱 노트란 향수를 처음 뿌렸을 때 가장 먼저 맡을 수 있는 향을 말해요.\n\n미들 노트는 톱 노트가 사라진 후 느껴지는 향으로, 전체 향의 핵심을 담당해요.\n\n베이스 노트는 가장 오래 지속되는 향으로, 향수의 기반을 담당해요.','조향 플래너 작성'),(12,77,26,3,'작성한 조향 플래너를 기반으로 블렌딩을 진행해주세요.\n\n선택한 향료들을 정해진 비율대로 향수 베이스에 첨가합니다. 이때 정밀한 계랑이 중요하니까 주의를 기울여주세요!','블렌딩'),(12,78,27,4,'모든 성분을 잘 섞은 후, 향이 잘 베어나도록 숙성시켜야 해요. \n\n향수 공병에 블렌딩한 향수를 넣고 스티커를 붙여서 포장해주세요.\n\n그리고 하루동안 숙성시키면 여러분만의 향수가 완성됩니다.','포장 및 숙성'),(13,95,28,1,'방향제 제작에 필요한 기본 재료와 도구를 소개합니다.  / 천연 방향제의 장점과 기본적인 원리를 이해합니다. / 안전한 작업을 위한 주의사항과 보관 방법을 배웁니다.','재료 준비 및 기초 지식'),(13,96,29,2,'간단한 석고 타입 방향제를 만들어 봅니다. / 방향제의 지속력과 효과를 높이는 방법을 배웁니다.','기본 방향제 만들기'),(13,97,30,3,'포장 및 디자인 아이디어를 통해 완성된 제품을 선물용으로 제작합니다.','응용 및 창작'),(14,101,31,1,'사이즈를 고르신뒤 그에 맞는 비즈발 도안을 골라주세요!!','도안 고르기'),(14,102,32,2,'골라주신 도안에 맞는 비즈들을 정리합니다','정리 및 구성하기'),(14,103,33,3,'실에 꿴 비즈들은 족자봉에 순서대로 끼워줍니다','커스텀하기'),(15,119,34,1,'왁스를 계량해서 녹입니다.\n\n저울을 이용해 용기의 용량에 맞춰 계량 후 녹여줍니다.','왁스 녹이기 단계'),(15,120,35,2,'염료를 이용해서 색을 내줍니다.','커스텀 단계'),(15,121,36,3,'왁스가 굳으면 심지를 정리하고 데코 하여 마무리합니다~','마무리 단계'),(16,160,43,1,'올바르게 칼을 잡는 방법부터 완성도를 높이는 재단 요령을 배울 거예요.','가죽 재단법 배우기'),(16,161,44,2,'이론을 배우고, 그리프를 이용하여 바느질할 길을 만들어 줍니다.','그리프(목타) 작업하기'),(16,162,45,3,'린카블레실과 바늘 2개를 사용해, 새들스티치를 배워요.','새들스티치 배우기'),(16,163,46,4,'기성품에 사용되는 토코놀과 슬리커 대신, 이탈리아산 엣지페인트로 깔끔하게 단면을 마감합니다.','가죽 단면 마감하기'),(16,164,47,5,'다양한 디자인에 활용되는 지퍼 작업을 배워봅니다.','지퍼를 활용해 작업하기'),(16,165,48,6,'이니셜 도구로 나만의 감성을 담아 간단한 문구를 새겨볼 거예요.','이니셜 새기기'),(17,168,49,1,'정사각형의 조각들을 각 1cm 씩 안쪽으로 접어주세요','모시 초기 세팅'),(17,169,50,2,'각 모서리를 이어서 만든 네모 모양의\n\n정확한 명칭은 \'옥사 향낭\'이라고 해요','감침질 단계'),(17,170,51,3,'취향에 맞게 비즈, 종이를 추가합니다','커스텀 단계'),(17,171,52,4,'만든 재료들을 구성한 형태에 맞게 실에 꿰는 단계입니다','모빌 제작 단계'),(18,174,53,1,'올바르게 칼을 잡는 방법부터 완성도를 높이는 재단 요령을 배울 거예요.','가죽 재단법 배우기'),(18,175,54,2,'이론을 배우고, 그리프를 이용하여 바느질할 길을 만들어 줍니다.','그리프(목타) 작업하기'),(18,176,55,3,'린카블레실과 바늘 2개를 사용해, 새들스티치를 배워요.','새들스티치 배우기'),(18,177,56,4,'기성품에 사용되는 토코놀과 슬리커 대신, 이탈리아산 엣지페인트로 깔끔하게 단면을 마감합니다.','가죽 단면 마감하기'),(18,178,57,5,'다양한 디자인에 활용되는 지퍼 작업을 배워봅니다.','지퍼를 활용해 작업하기'),(18,179,58,6,'이니셜 도구로 나만의 감성을 담아 간단한 문구를 새겨볼 거예요.','이니셜 새기기'),(19,183,59,1,'계란을 한 알 그릇에 넣고 알끈을 제거하고, 설탕 및 핫초코 가루 등의 필요한 재료를 세팅하는 단계입니다','초기 조리 세팅 단계'),(19,184,60,2,'설탕과 핫초코 등의 가루 재료들을 넣고 티스푼이나 젓가락으로 휘저어주세요','재료 혼합 단계'),(19,185,61,3,'잘 섞이도록 꼼꼼하게 저어주세요\n그 후 전자렌지에 20-30초만 돌려주면 완성!!!','혼합 후 조리 단계'),(20,190,62,1,'먼저 식빵에 딸기잼, 구운 햄, 치즈 등 본인의 커스텀 샌드위치를 제작하는 과정입니다. \n마지막에 식빵에 머스타드소스를 발라준 후 덮어주세요!','커스텀 과정'),(20,191,63,2,'뭉친 것이 없도록 계란을 잘 풀어주신 후, 계란물에 앞, 뒤, 옆 총 6면을 모두 적셔주세요\n\n그다음 빵가루에 파슬리가루를 살짝 섞은 후 똑같이 6면 모두 묻혀주시면 돼요!','계란 및 파슬리 커버 과정'),(20,192,64,3,'앞면, 뒷면, 옆면 모두 노릇노릇하게 구워줄게요~!','굽기 단계'),(21,195,65,1,'필요한 실이나 끈을 선택합니다. 주로 면사, 마닐라 로프, 나일론 끈 등이 사용됩니다.\n가위를 준비하고, 매듭을 고정할 수 있는 막대나 링, 또는 작업대가 필요합니다.','재료 준비하기'),(21,196,66,2,'마크라메의 기본 매듭에는 평매듭(사각 매듭), 반매듭, Lark\'s Head Knot(머리 매듭) 등이 있습니다.\n각 매듭의 방법을 이해하고 연습하여 손에 익히는 것이 중요합니다.\n','기본 매듭 배우기'),(21,197,67,3,'필요한 매듭 종류와 길이를 고려하여 디자인을 스케치하거나 머릿속으로 구상합니다.\n막대나 링에 실을 고정한 후, 디자인에 맞춰 매듭을 묶어 나갑니다.','디자인 계획 및 작품 시작하기'),(22,200,68,1,'블럭, 호환 피규어, 부자재 등을 골라줍니다','재료 고르기'),(22,201,69,2,'키링에 연결할 피규어를 조립합니다','피규어 조립'),(22,202,70,3,'부자재를 연결하여 마무리 해줍니다','마무리'),(23,206,71,1,'딸기는 찬물에 깨끗이 씻어주시고,\n딸기의 이파리 부분은 칼로 잘라주세요.','딸기 건조'),(23,207,72,2,'팥앙금 500g을 30g~32g으로 분할해주시면\n딸기의 개수와 똑같이 16개의 팥앙금이 나온답니다 ^^\n\n동그랗게 분할해준 팥앙금 하나를\n손바닥에 납작하게 펴주세요.','팥 소분 및 감싸기'),(23,208,73,3,'찹쌀가루 300g과 설탕 80g, 소금 2g을 준비해주세요,\n그리고 믹싱볼에 이 재료 3가지를 합쳐줍니다.\n실리콘 주걱을 이용해서 골고루 섞어주세요.','찹쌀 반죽 만들기'),(23,209,74,4,'넓은 쟁반에 옥수수 전분가루를 많이 뿌려주시고, 그 위에 앙금과 딸기의 개수만큼 분리하여 소분해주세요','찹쌀 반죽 소분'),(23,210,75,5,'한 덩이 납작하게 펴 준 찹쌀반죽 위에\n딸기에 팥앙금 옷을 입혀준 딸기 알맹이를\n가운데에 올려주세요.\n\n찹쌀반죽에 옥수수 전분가루를 적당히 묻혀가면서\n팥앙금 옷을 입은 딸기 알맹이에\n찹쌀반죽을 감싸주세요.','딸기 모찌 완성하기'),(24,213,76,1,'만들고 싶은 비누 디자인 스케치 해보고제작하기\n','비누제작'),(24,214,77,2,'완성된 비누 몰드 정리후 보온하기','보온하기'),(25,217,78,1,'캔들을 녹여준후 캔들 바디를 만들어 굳혀줍니다','캔들 녹인후 틀 만들어주기'),(25,218,79,2,'바디가 어느정도 굳은 후 꽃으로 캔들을 꾸며줍니다','꽃을 이용해 캔들 꾸며주기'),(25,219,80,3,'캔들이 굳는동안 꽃을 이용해 왁스타블렛 제작하기','왁스타블렛 만들기'),(26,222,81,1,'목봉에 머리매듭을 지어줍니다','머리매듭'),(26,223,82,2,'가방 연결해 형태 만들기','앞뒤판 연결하기'),(26,224,83,3,'가방과 어깨끈을 연결하는 매듭 만들기','어깨끈 연결하기'),(27,227,84,1,'실은 색깔별로 고를수 있습니다.','기본 실을 준비해줍니다'),(27,228,85,2,'무럭무럭','실을 엮어서 키워줍니다.'),(27,229,86,3,'완성해줍니다.','완성!'),(28,232,87,1,'입욕제에 넣을 향을 고릅니다.','향 고르기'),(29,235,88,1,'흙과 돌, 유목을 사용하여 지형을 표현합니다','흙, 돌, 유목으로 지형 표현하기'),(29,236,89,2,'후마타 고사리 등의 작은 식물을 심습니다','작은 식물 심기'),(29,237,90,3,'모래 자갈로 디테일을 표현합니다\n\n피규어를 배치하여 완성합니다','피규어를 배치하고 완성'),(30,240,91,1,'양말목 공예의 기초가 되는 기본엮기 방법을 배우기.\n원형또는 사각 방석의 시작 단계를 만들기\n','양말목을 엮는 기초 방법을 배우는 시간'),(30,241,92,2,'기본엮기 방법으로 방석을 점차 키워주기.\n적당한 크기가 되면 본드없이 마무리 하는법 배우기.','방석의 형태를 키우는 시간'),(31,244,93,1,'연습판에 작업 기법을 배우면서 익혀봅니다.','연습판에 연습하기'),(31,245,94,2,'제공해 드리는 도안 중 마음에 드는 도안을 선택하신 후 이미지를 스크래치 기법으로 표현해주세요.','커스텀하기'),(31,246,95,3,'인증샷을 남겨주세요!','마무리하기'),(32,249,96,1,'비즈와 스팽글을 원하는 순서대로 교차로 걸어 디자인합니다.','비즈와 스팽글 걸기'),(32,250,97,2,'3줄을 만든 후에는 모두 연결하여 완성합니다','연결하기'),(33,253,98,1,'\n링에 실로 그물을 만들면서 비즈를 꿰어줍니다.','링에 비즈 달기'),(33,254,99,2,'\n원하는 비즈로 그물망을 완성합니다.','장식비즈 달기'),(33,255,100,3,'\n장식깃을 만들어 달아줍니다.','장식깃만들기'),(34,258,101,1,'글라스 페인팅의 기본 개념 이해 및 필요한 재료와 도구 소개 / 필요한 재료 및 도구 소개: 파레트, 펜오일, 펜촉&펜대, 스패츌라, 나이프, 4색안료, 에탄올 등 / 안전한 작업을 위한 주의사항 안내\n','오리엔테이션 및 재료 소개'),(34,259,102,2,'자신의 작품을 위한 디자인을 구상하고 스케치 / 디자인 아이디어 브레인스토밍 / 스케치 기반으로 색상 계획 세우기','디자인 구상 및 스케치'),(34,260,103,3,'디자인을 기반으로 페인팅 / 완성된 페인팅 작품에 유약을 바르고 건조','페인팅 및 마무리'),(35,263,104,1,'글라스 페인팅의 기본 개념 이해 및 필요한 재료와 도구 소개 / 필요한 재료 및 도구 소개: 파레트, 펜오일, 펜촉&펜대, 스패츌라, 나이프, 4색안료, 에탄올 등 / 안전한 작업을 위한 주의사항 안내','오리엔테이션 및 재료 소개'),(35,264,105,2,'자신의 작품을 위한 디자인을 구상하고 스케치 / 디자인 아이디어 브레인스토밍 / 스케치 기반으로 색상 계획 세우기','디자인 구상 및 스케치'),(35,265,106,3,'디자인을 기반으로 페인팅 / 완성된 페인팅 작품에 유약을 바르고 건조','페인팅 및 마무리'),(36,294,107,1,'바느질을 처음 접하는 분들을 위해 기초 손바느질 방법과 솔기처리법을 배워요','기초 손바느질과 솔기처리'),(36,295,108,2,'저고리의 기본구조를 배우고 민저고리를 직접 만들어봅니다.','저고리 만들기'),(36,296,109,3,'조절이 되는 어깨끈이 있는 말기치마를 만들어봅니다.','말기치마 만들기'),(36,297,110,4,'배씨댕기를 만드는 방법과 간단한 액세서리 제작 방법을 배워요.','배씨댕기 만들기'),(36,298,111,5,'다양한 원단을 직접 보고, 적절한 사용방법을 익혀봅니다.','한복원단 설명과 활용법');
/*!40000 ALTER TABLE `step` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-16  0:28:13