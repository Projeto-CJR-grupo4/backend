import { BadRequestException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { join } from 'path';

const EXTENSOES: Record<string, string> = {
    'image/png': '.png',
    'image/jpeg': '.jpeg',
    'image/webp': '.webp',
    'image/svg+xml': '.svg',
};

export const lojaUploadOptions = {
    storage: diskStorage({
        destination: (_req, _file, cb) => {
            const dir = join(process.cwd(), 'uploads', 'lojas');

            mkdirSync(dir, { recursive: true });

            cb(null, dir);
        },

        filename: (_req, file, cb) => {
            cb(null, `${randomUUID()}${EXTENSOES[file.mimetype]}`);
        },
    }),

    limits: {
        fileSize: 2 * 1024 * 1024,
    },

    fileFilter: (
        _req: unknown,
        file: Express.Multer.File,
        cb: (error: Error | null, accept: boolean) => void,
    ) => {
        if (!EXTENSOES[file.mimetype]) {
            return cb(
                new BadRequestException('Envie uma imagem PNG, JPG ou WebP.'),
                false,
            );
        }

        cb(null, true);
    },
};