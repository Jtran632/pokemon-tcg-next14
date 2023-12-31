/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client'
import { trpc } from '../_trpc/client'
import { useRouter } from 'next/navigation';
export default function DisplayFavs() {
    const getFavs = trpc.getFavs.useQuery()
    const delFav = trpc.delFav.useMutation({
        onSuccess: () => {
            getFavs.refetch()
        }
    });
    if (getFavs.status !== 'success') {
        return <>Loading...</>;
    }
    return (
        <div className='w-screen h-screen'>
            <div className='flex flex-col justify-center items-center'>
                <div className='text-center'>{getFavs.data.length > 0 ? "Favorites" : "You haven't added any favorites"}</div>
                <div className='grid grid-cols-3 w-fit gap-10'>
                    {getFavs.data?.map((favs: any) => (
                        <div className='col-span-1 h-fit w-fit bg-black border rounded-md flex flex-col items-end' key={favs.id}>
                            <button onClick={async () => {
                                delFav.mutate(favs.imageUrl || '')
                            }}>💔</button>
                            <img className='[22rem] w-[16rem] rounded-md' src={favs.imageUrl} ></img>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}