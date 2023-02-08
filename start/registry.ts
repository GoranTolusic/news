import { Express, Request, Response } from 'express'
import * as fs from 'fs'

export const registry = async (app: Express) => {
    const routesPath = './src/routes'
    const middlewarePath = './src/middlewares'

    fs.readdir(middlewarePath, async (err, files) => {
        for (let oneMiddlewareFile of files) {
            let fileName = oneMiddlewareFile.replace('.ts', '')
            const module = await import('.' + middlewarePath + '/' + fileName)
            if (module && module[fileName + 'Middleware']) {
                app.use(`/${fileName}`, module[fileName + 'Middleware'])
            }
        }
    })

    fs.readdir(routesPath, async (err, files) => {
        for (let oneRouteFile of files) {
            let fileName = oneRouteFile.replace('.ts', '')
            const module = await import('.' + routesPath + '/' + fileName)
            if (module && module[fileName + 'Routes']) {
                console.log('module')
                app.use(`/${fileName}`, module[fileName + 'Routes'])
            }
        }

        app.all('*', function (req: Request, res: Response) {
            res.status(404).send({
                message: 'Unknown route'
            });
        })
    })
};