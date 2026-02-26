import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

type ValidationTarget = 'body' | 'query' | 'params';

export const validate =
  <T extends z.ZodTypeAny, K extends ValidationTarget>(schema: T, target: K = 'body' as K) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(req[target]);
      req[target] = parsed;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        req.log?.warn?.(
          {
            target,
            [target]: req[target],
            issues: error.issues,
          },
          'Request validation failed',
        );

        return res.status(400).json({
          message: `Validation failed for ${target}`,
          issues: error.issues,
        });
      }

      next(error);
    }
  };
