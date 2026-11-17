import { BadRequestException } from "@nestjs/common";
import { randomUUID } from "crypto";
import { mkdirSync } from "fs";
import { diskStorage } from "multer";
import { join } from "path";

const EXTENSOES: Record<string, string> = {
    'image/png': '.png',
    'image/jpeg': '.jpeg',
    'image/webp':'.webp',
};

export const MAX_IMAGENS_POR_ENVIO = 4;

export const productImagesUploadOptions = {
    storage: diskStorage({
        destination: (_req, _file, cb) => {
            const dir = join(process.cwd(), 'uploads', 'produtos');
            mkdirSync(dir, {recursive: true });
            cb(null, dir);
        },
        filename: (_req, file, cb) => {
            cb(null, `${randomUUID()}${EXTENSOES[file.mimetype]}`);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (
        _req: unknown,
        file: Express.Multer.File,
        cb: (error: Error | null, accept: boolean) => void,
    ) => {
        if (!EXTENSOES[file.mimetype]) {
            return cb(new BadRequestException('Envie imagens PNG, JPG ou WEBP'), false);
        }
        cb(null, true);
    },
};
