-- CreateTable
CREATE TABLE `produtos` (
    `id_produto` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NULL,
    `categoria` VARCHAR(191) NULL,
    `granulacao` INTEGER NULL,
    `material` VARCHAR(191) NULL,
    `comprimento_mm` INTEGER NULL,
    `largura_mm` INTEGER NULL,
    `altura_mm` INTEGER NULL,
    `peso_g` INTEGER NULL,
    `preco` DECIMAL(65, 30) NOT NULL,
    `estoque` INTEGER NOT NULL,
    `imagem_url` VARCHAR(191) NULL,
    `data_cadastro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_produto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
