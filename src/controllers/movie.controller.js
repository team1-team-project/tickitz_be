const response = require("../helpers/standardRespond");
const errorResponse = require("../helpers/errorResponse");
const movieModel = require("../models/movie.model");
const { unlink } = require("node:fs");

const movieController = {
  searchSortMovie: (req, res) => {
    const {
      searchBy = "",
      search = "",
      sort_by = "",
      sort_type = "ASC",
      limit = "25",
      page = 1,
    } = req.query;

    const offset = (page - 1) * limit;
    movieModel.searchMovie(
      searchBy,
      search,
      sort_by,
      sort_type,
      limit,
      offset,
      (results) => {
        if (results.length < 1) {
          return res.redirect("/404");
        }
        const pageInfo = {};

        movieModel.countAllMovie(search, (err, totalData) => {
          pageInfo.totalData = totalData;
          pageInfo.totalPage = Math.ceil(totalData / limit);
          pageInfo.currentPage = parseInt(page);
          pageInfo.nextPage =
            pageInfo.currentPage < pageInfo.totalPage
              ? pageInfo.currentPage + 1
              : null;
          pageInfo.prevPage =
            pageInfo.currentPage > 1 ? pageInfo.currentPage - 1 : null;
          return response(res, "List all movie search", results, pageInfo);
        });
      }
    );
  },
  detailMovie: (req, res) => {
    return movieModel
      .movieById(req.params.id)
      .then((result) => {
        if (result != null) {
          return res.status(200).send({ message: "Success", data: result });
        } else {
          return res.status(404).send({
            message: "Sorry data not found! Please check your input ID!",
          });
        }
      })
      .catch((error) => {
        return res.status(500).send(error);
      });
  },
  addMovie: (req, res) => {
    filename = req.file.filename;
    movieModel.createMovie(filename, req.body, (err, results) => {
      if (err) {
        return response(
          res,
          `Failed to create movie: ${err.message}`,
          null,
          null,
          400
        );
      }
      return response(res, "movies created", results.rows[0]);
    });
  },
  updateMovie: (req, res) => {
    let filename = null;

    if (req.file) {
      filename = req.file.filename;
    }

    const request = {
      ...req.body,
      poster: filename, //single
      id: req.params.id,
    };

    return movieModel
      .updateMovie(request)
      .then((result) => {
        if (result[0].poster != null) {
          for (let i = 0; i < result.length; i++) {
            unlink(`public/upload/${result[i].poster}`, (err) => {
              if (err) throw err;
            });
          }
        }
        return response(res, "Movie updated", res[0]);
      })
      .catch((error) => {
        return response(res, `Failed update Movie: ${error}`, null, null, 500);
      });
  },
  removeMovie: (req, res) => {
    const { id } = req.params;
    return movieModel
      .deleteMovie(id)
      .then((result) => {
        for (let i = 0; i < result.length; i++) {
          unlink(`public/upload/${result[i].poster}`, (err) => {
            if (err) throw err;
          });
        }
        return response(res, "Movie deleted", res[0]);
      })
      .catch((err) => {
        return response(res, `Failed remove movie: ${err}`, null, null, 500);
      });
  },
};

module.exports = movieController;
