import connection from '../database.js'
const limitPagination=10
export const getAllMoviesbycat =async(req,res)=>{
    try {
        const {category}=req.params
        let query=await MoviesCat(category)
        if(typeof query=="undefined")throw ("Error")
        return res.status(200).json(query)
    } catch (error) {
        console.error(error)
        return  res.status(500).send("Algo salio mal:"+error)
    }
}
export const getAllMovies=async(req,res)=>{
    try {
        let query=await connection("film")
            .innerJoin("film_category","film_category.film_id","film.film_id")
            .innerJoin("category","category.category_id","film_category.category_id")
            .select("film.title");
        return res.status(200).json(query)
    } catch (error) {
        console.error(error)
        return res.status(500).send("Algo salio mal:"+error)
    }
}
export const getMovies=async(req,res)=>{
    try {
        const {pagination}=req.params
        if(typeof pagination=="undefined" || pagination==0)throw ("Pagination shoud be more than 0 and can´t be undefined")
        let Ofset=pagination*limitPagination;
        let query=await connection("film")
            .innerJoin("film_category","film_category.film_id","film.film_id")
            .innerJoin("category","category.category_id","film_category.category_id")
            .limit(limitPagination).offset(Ofset)
            .select("film.title")
            return res.status(200).json(query)
    } catch (error) {
        console.error(error)
        return res.status(500).send("Algo salio mal:"+error)
    }
}
export const getMoviesbycat=async(req,res)=>{
    try {
        const {pagination,category}=req.params
        if(pagination==0)throw ("pagination shoud be grater than 0")
        const query=await MoviesCat(category,Number(pagination))
        if(typeof query=="undefined")throw ("Error")
        return res.status(200).json(query)
    } catch (error) {
        console.error(error)
        return res.status(500).send("Algo salio mal:"+error)
    }
}
export const totalPaginationMovies=async(req,res)=>{
    try {
        const {category}=req.params
        let query=await MoviesCat(category)
        if(typeof query=="undefined")throw ("Error")
        let pagination=Totalpaginations(query.length)
        res.status(200).json({Totalpages:pagination});
    } catch (error) {
        console.error(error)
        return res.status(500).send("Algo salio mal:"+error)
    }
}
//Utils
const MoviesCat=async(category,pagination)=>{
    let query,Ofset=typeof pagination=="undefined"?0:pagination*limitPagination
    if(Ofset>0)
    {
        if(typeof pagination!=="number") throw("Wrong data type u must have send a number")
        query=await connection("film")
            .innerJoin("film_category","film_category.film_id","film.film_id")
            .innerJoin("category","category.category_id","film_category.category_id")
            .whereILike("category.name",`%${category}%`)
            .limit(limitPagination).offset(Ofset)
            .select("film.title");
        return query
    }
    query=await connection("film")
        .innerJoin("film_category","film_category.film_id","film.film_id")
        .innerJoin("category","category.category_id","film_category.category_id")
        .whereILike("category.name",`%${category}%`)
        .select("film.title");
    return query
}
const Totalpaginations=counter=>Math.floor(counter/limitPagination)