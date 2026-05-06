import {useRef,useCallback}from 'react';

const useInfiniteScroll=(onLoadMore, hasMore)=>{
    const observer=useRef();

    const observerRef=useCallback((node)=>{
        if(!hasMore)return;
        if(observer.current)observer.current.disconnect();

        observer.current=new IntersectionObserver((entries)=>{
            if(entries[0].isIntersecting){
                onLoadMore();
            }
        },{
            root:null,
            rootMargin:"150px",
            threshold:0
        });

        if(node)observer.current.observe(node);
    },[onLoadMore, hasMore]);

    return observerRef;
}

export default useInfiniteScroll;
