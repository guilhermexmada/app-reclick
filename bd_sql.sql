-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.4.32-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.7.0.6850
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para reclick
CREATE DATABASE IF NOT EXISTS `reclick` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;
USE `reclick`;

-- Copiando estrutura para tabela reclick.cidades
CREATE TABLE IF NOT EXISTS `cidades` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) DEFAULT NULL,
  `populacao` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela reclick.comentarios
CREATE TABLE IF NOT EXISTS `comentarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario_comentario` int(11) DEFAULT NULL,
  `id_noticia` int(11) DEFAULT NULL,
  `texto` varchar(250) DEFAULT NULL,
  `data_hora` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_usuario_comentario` (`id_usuario_comentario`),
  KEY `fk_id_noticia` (`id_noticia`),
  CONSTRAINT `fk_id_noticia` FOREIGN KEY (`id_noticia`) REFERENCES `noticias` (`id`),
  CONSTRAINT `fk_id_usuario_comentario` FOREIGN KEY (`id_usuario_comentario`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela reclick.curtidas
CREATE TABLE IF NOT EXISTS `curtidas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario_curtida` int(11) DEFAULT NULL,
  `id_noticia_curtida` int(11) DEFAULT NULL,
  `data_hora` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_usuario_curtida` (`id_usuario_curtida`),
  KEY `fk_id_noticia_curtida` (`id_noticia_curtida`),
  CONSTRAINT `fk_id_noticia_curtida` FOREIGN KEY (`id_noticia_curtida`) REFERENCES `noticias` (`id`),
  CONSTRAINT `fk_id_usuario_curtida` FOREIGN KEY (`id_usuario_curtida`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela reclick.dias
CREATE TABLE IF NOT EXISTS `dias` (
  `cod` int(11) NOT NULL AUTO_INCREMENT,
  `dia_semana` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`cod`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela reclick.gastos
CREATE TABLE IF NOT EXISTS `gastos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario_empresa` int(11) DEFAULT NULL,
  `data_hora` datetime DEFAULT NULL,
  `litros_agua` double DEFAULT NULL,
  `kwh_energia` double DEFAULT NULL,
  `kg_organicos` double DEFAULT NULL,
  `kg_rejeitos` double DEFAULT NULL,
  `kg_rejeitos_perigosos` double DEFAULT NULL,
  `kg_reciclaveis` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_usuario_empresa` (`id_usuario_empresa`),
  CONSTRAINT `fk_id_usuario_empresa` FOREIGN KEY (`id_usuario_empresa`) REFERENCES `usuario_empresa` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela reclick.item_biblioteca
CREATE TABLE IF NOT EXISTS `item_biblioteca` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(250) DEFAULT NULL,
  `tipo` varchar(250) DEFAULT NULL,
  `foto` varchar(250) DEFAULT NULL,
  `descricao` varchar(250) DEFAULT NULL,
  `id_usuario_biblioteca` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_usuario_biblioteca` (`id_usuario_biblioteca`),
  CONSTRAINT `fk_id_usuario_biblioteca` FOREIGN KEY (`id_usuario_biblioteca`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela reclick.noticias
CREATE TABLE IF NOT EXISTS `noticias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(250) DEFAULT NULL,
  `tema` varchar(250) DEFAULT NULL,
  `texto` varchar(2000) DEFAULT NULL,
  `autor` varchar(250) DEFAULT NULL,
  `data_hora` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela reclick.ponto_coleta
CREATE TABLE IF NOT EXISTS `ponto_coleta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) DEFAULT NULL,
  `nome` varchar(250) DEFAULT NULL,
  `endereco` varchar(250) DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `distancia` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_usuario` (`id_usuario`),
  CONSTRAINT `fk_id_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela reclick.tarefas
CREATE TABLE IF NOT EXISTS `tarefas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario_tarefa` int(11) DEFAULT NULL,
  `descricao` varchar(250) DEFAULT NULL,
  `data_alarme` varchar(50) DEFAULT NULL,
  `hora_alarme` time DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_usuario_tarefa` (`id_usuario_tarefa`),
  CONSTRAINT `fk_id_usuario_tarefa` FOREIGN KEY (`id_usuario_tarefa`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5883 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela reclick.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(250) DEFAULT NULL,
  `senha` varchar(250) DEFAULT NULL,
  `email` varchar(250) DEFAULT NULL,
  `telefone` varchar(50) DEFAULT NULL,
  `endereco` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela reclick.usuario_empresa
CREATE TABLE IF NOT EXISTS `usuario_empresa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(250) DEFAULT NULL,
  `cnpj` varchar(50) DEFAULT NULL,
  `email` varchar(250) DEFAULT NULL,
  `razao_social` varchar(250) DEFAULT NULL,
  `telefone` int(12) DEFAULT NULL,
  `cep` int(8) DEFAULT NULL,
  `uf` varchar(2) DEFAULT NULL,
  `municipio` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Exportação de dados foi desmarcado.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
