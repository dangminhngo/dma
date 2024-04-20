declare module "server-only"

export type InferElement<T> = T extends readonly (infer ET)[] ? ET : never

export type SVGProps = React.SVGAttributes<SVGSVGElement>
