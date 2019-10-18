# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.27-0ubuntu0.16.04.1)
# Database: ia_trading_db
# Generation Time: 2019-10-10 18:08:00 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table accesstoken
# ------------------------------------------------------------

DROP TABLE IF EXISTS `trade_forecast`;

CREATE TABLE `trade_forecast` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `symbol` VARCHAR(50) NOT NULL,
  `date` DATETIME NOT NULL DEFAULT NOW(), 
  `open` DECIMAL(20,5) NOT NULL,
  `high` DECIMAL(20,5) NOT NULL,
  `low` DECIMAL(20,5) NOT NULL,
  `close` DECIMAL(20,5) NOT NULL,
  `graphic_time` ENUM('NONE','1M','2M','3M','4M','5M',"M6","M10","M12","M15","M20","M30","H1","H2","H3","H4","H6","H8","H12","D1","W1","MN1") NOT NULL,
  `ma1_value` DECIMAL(20,5) NOT NULL,
  `ma2_value` DECIMAL(20,5) NOT NULL,
  PRIMARY KEY (`id`)
);


/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
