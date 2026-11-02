interface Props {
  params: Promise<{ id: string }>
}

const Page = async ({ params }: Props) => {
  const { id } = await params
  return <p>{id}</p>
}

export default Page
