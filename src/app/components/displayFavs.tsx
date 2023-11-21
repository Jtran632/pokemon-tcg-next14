/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client'
import { trpc } from '../_trpc/client'
export default function DisplayFavs() {
    const getFavs = trpc.getFavs.useQuery();
    const delFav = trpc.delFav.useMutation({
        onSettled: () => {
            getFavs.refetch()
        }
    });
    return (
        <div className='w-screen h-screen'>
            <div className='flex flex-col justify-center items-center'>
                <div className='text-center'>Favorites</div>
                <div className='grid grid-cols-3 w-fit gap-10'>
                    {getFavs?.data?.map((favs) => (
                        <div className='col-span-1 h-fit w-fit bg-black border-2 flex flex-col items-end' key={favs.id}>
                            <button className='px-2' onClick={async () => {
                                delFav.mutate(favs.imageUrl || '')
                            }}>x</button>
                            <img src={favs.imageUrl || ''} ></img>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}